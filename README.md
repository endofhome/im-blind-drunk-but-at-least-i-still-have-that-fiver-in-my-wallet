# im-blind-drunk-but-at-least-i-still-have-that-fiver-in-my-wallet
It's not big or clever, it's a _clunky_ screen scraping script to find cheap spirits in the UK (currently from Sainsburys and Tesco). Probably only works for Laphroaig, since that's what I use it for.

## Requirements
`node.js`

`cURL`

`Headless Chrome` (available in Chrome 59+)

## Usage

_macOs/Linux_
* clone this repo
* ensure that you have `curl` and `node` available on your system. Mac users, you can install them both with `homebrew` - hit up a search engine if this is new to you. Linux users, you can probably handle this.
* you need Chrome version 59 or later on your system.
* install the node dependencies by navigating to this directory in your terminal and typing `npm install`.
* to run the script from your terminal, navigate to this directory and type `./cheapbooze.sh <name-of-spirit-to-search-for>`, ie. `./cheapbooze Laphroaig`
* if the file will not execute, you may need to set permissions: `chmod +x cheapbooze.sh` should do it.
* wait. watch. win.

_Windows_
* you will need a unix-like environment like Cygwin etc. Git for Windows provides a simple out-of-the-box solution including `curl`.
* the above steps apply.