const prerender = require('prerender-chrome-headless');
const fs = require('fs');

// Page to be statically pre-rendered
const SAINSBURYS_ALCOHOL_SPECIALS_PAGE = 'https://www.sainsburys.co.uk/webapp/wcs/stores/servlet/CategorySeeAllView?langId=44&categoryId=340854&storeId=10151&krypto=baLCvUAYYI56bGQ5NNlCIvLRLv4Dn0GbiwKx7yHNm3%2FsZRfiRca%2BH1vJ7Ykh6gPkCJe9OqJCIsdb83mziSkxrBAiiH%2Fobm28BKRHYdRZglcqiljI9p1yrrmoVm%2FD0%2FHPH41qttGcmaDNe23o6dtxyZvHjfQXkK%2BYrzi%2BgrJu%2Fg12g9LHViRJZtojxQu4qoSDT9hWdAzXaJcCqs8WWQ66HqtwSr2oO9udud7b59ps0GH8ssvTPGzNf6VraXdY%2FonxOgIwBDr4UaqRAEudjYj7Tj0mO7R%2F0%2FKh%2FlBEhvheYe4pCtTNkHoJmfIbuVUGyUYZu4Y90czHJRFwBk4rQXft1%2B9faMlaPHFF%2FFgtkzeb7J373EhF6dw1MCUCJfO9muFF&ddkey=https%3ACategorySeeAllView#langId=44&storeId=10151&catalogId=10123&categoryId=340854&parent_category_rn=&top_category=&pageSize=108&orderBy=FAVOURITES_FIRST&searchTerm=&catSeeAll=true&beginIndex=0&categoryFacetId1=340854&categoryFacetId2=340885&facet=88';

function writeSpecialOfferPage(supermarketName, offerPage) {
    prerender(offerPage, {
	    delayLaunch: 0,
	    delayPageLoad: 7000, 
	    chromeFlags: ["--user-agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'"], // list of flags 
    }).then((html) => {
	    fs.writeFileSync(`${__dirname}/${supermarketName}.html`, html);
	});
}

writeSpecialOfferPage("sainsburys", SAINSBURYS_ALCOHOL_SPECIALS_PAGE);