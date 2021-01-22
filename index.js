const fs = require('fs');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getWebsite = async () => {
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
    let arr10 = imgArr.slice(0, 10);
    // fs.mkdir('Pictures', { recursive: true }, (err) => {
    //   if (err) throw err;
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

      // const text = await pic.text();
      // console.log(text);
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
