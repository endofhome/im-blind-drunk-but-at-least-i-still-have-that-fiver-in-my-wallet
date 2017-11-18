#!/bin/bash

GREEN=`tput setaf 2`
RED=`tput setaf 1`
RESET=`tput sgr0`

PRODUCT=$1

echo "Checking for ${PRODUCT} deals at Sainsbury's..."

# Sainsbury's script uses Chrome headless and pre-renders JavaScript. This is unnecessary, as there is a non-JS version of their site.
# However, it has been a good learning experience.
rm sainsburys.html
node supermarketAlcoholDealsFetcher.js
SAINSBURYS=$(grep ${PRODUCT} sainsburys.html)
SAINSBURYS_PRICE=$(grep -A 7 ${PRODUCT} sainsburys.html | grep £ | sed 's/.*Only //' | tr -d '<br>')

if [[ -n "$SAINSBURYS" ]]; then
  echo "${GREEN}On sale at Sainsbury's! ${SAINSBURYS_PRICE}${RESET}"
else
  echo "${RED}No deal at Sainsbury's. :(${RESET}"
fi

echo ""
echo "Checking for ${PRODUCT} deals at Tesco..."

# Tesco just uses good 'ol cURL, in a loop to get (what I think will be) all the offer pages.
rm tesco.html
# Magic number is 14 - for now:
PAGE=1
while [[ $PAGE -ne 14 ]]
do
  printf "Checking special offers page $PAGE\r"
  curl -s "https://www.tesco.com/groceries/en-GB/promotions/alloffers?department=Spirits&viewAll=department&page=${PAGE}" >> tesco.html
  let "++PAGE"
done

TESCO=$(grep ${PRODUCT} tesco.html)
TESCO_OFFER=$(awk '/'${PRODUCT}'/ {
    match($0, /'${PRODUCT}'/); print substr($0, RSTART - 0, RLENGTH + 1000);
}' tesco.html | grep -v "&quot;,&quot;facetName&quot;:&quot;.*&quot;,&quot;binCount&quot;:1,&quot;isSelected&quot;:false},{&quot;facetId&quot;:&quot;.*&quot;," | sed 's/.*Save/Save/' | sed 's/<.*//')

if [[ -n "$TESCO"  ]]; then
  printf "${GREEN}On sale at Tesco! ${TESCO_OFFER}${RESET}"
else
  printf "${RED}No deal at Tesco. :(${RESET}"
fi

echo ""
