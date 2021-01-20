const fs = require('fs');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getWebsite = async (_) => {
  try {
    const data = await fetch(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    const parser = await data.text();
    const dom = await new JSDOM(parser);
    const window = await dom.window.document;
    const imgNodeList = await window.querySelectorAll('img');
    let imgArr = [];
    for (let elem of imgNodeList.values()) {
      imgArr.push(elem.src);
    }
    let arr10 = imgArr.slice(0, 9);
    // const parent = await dom.window.document.querySelector('section');
    // const children = await parent.childNodes;
    // const arr = await [...children];

    console.log(arr10);
  } catch (error) {
    console.log(error);
  }
};
getWebsite();
