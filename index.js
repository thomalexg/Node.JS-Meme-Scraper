const fs = require('fs');
const fetch = require('node-fetch');

const getWebsite = async (_) => {
  try {
    const data = await fetch(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    const parser = await data.text();
    console.log(parser);
  } catch (error) {
    console.log(error);
  }
};
getWebsite();
