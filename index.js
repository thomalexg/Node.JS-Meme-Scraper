const fs = require('fs');
const scrape = require('website-scraper');
const options = {
  urls: ['http://nodejs.org/'],
  directory: '/path/to/save/',
};
