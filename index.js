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
    let arr10 = await imgArr.slice(0, 9);
    // fs.mkdir('Pictures', { recursive: true }, (err) => {
    //   if (err) throw err;
    try {
      if (!fs.existsSync('./meme_folder')) {
        fs.mkdirSync('./meme_folder');
      }
    } catch (err) {
      console.error(err);
    }

    let picArr = [];
    async function whatever(elem) {
      const pic = await fetch(elem);
      const text = await pic.text();
      console.log(text);
    }

    for (let elem of arr10) {
      whatever(elem);
    }

    // for (let elem of arr10) {
    //   async function whatever() {
    //     const pic = await fetch(elem);
    //     const text = await pic.text();

    //   }
    //   whatever();
    // }
    // const parent = await dom.window.document.querySelector('section');
    // const children = await parent.childNodes;
    // const arr = await [...children];
  } catch (error) {
    console.log(error);
  }
};
getWebsite();
