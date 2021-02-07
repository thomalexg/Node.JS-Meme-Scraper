const fs = require('fs');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getWebsite = async () => {
  try {
    const data = await fetch(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    const text = await data.text();
    const dom = await new JSDOM(text);
    const window = await dom.window.document;
    const imgNodeList = await window.querySelectorAll('img');
    const imgArr = [];
    for (const elem of imgNodeList.values()) {
      imgArr.push(elem.src);
    }
    const arr10 = imgArr.slice(0, 10);

    try {
      if (!fs.existsSync('./meme_folder')) {
        fs.mkdirSync('./meme_folder');
      }
    } catch (err) {
      console.error(err);
    }
    let count = 1;
    const downloadJpg = async (url) => {
      const pic = await fetch(url);
      const buffer = await pic.buffer();
      await fs.promises.writeFile(`./meme_folder/${count}image.jpg`, buffer);
      console.log(`Pictures downloaded: ${count}`);
      count++;
    };
    const downloadJpgInit = async () => {
      for (const url of arr10) {
        await downloadJpg(url);
      }
    };

    downloadJpgInit();
  } catch (error) {
    console.log(error);
  }
};

getWebsite();
