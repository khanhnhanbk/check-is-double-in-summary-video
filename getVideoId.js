require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const data = require('./data/trimData.json');
async function getPageContent(id) {
  const blockId = id;
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  //   console.log(response);
  //   content = response.results[0].video.external.url;

  return response.results;
}

finallyData = [];

function a() {
  for (let i = 0; i < data.length; i++) {
    let tempData = {
      title: data[i].title,
      url: data[i].url,
      content: null,
    };
    getPageContent(data[i].id).then((res, rax) => {
      // console.log(res);
      // file item has type == 'video' in res
      res.forEach((item) => {
        if (item.type === 'video') {
          if (tempData.content == null) {
            tempData.content = item.video.external.url;
          }
        }
      });
      finallyData.push(tempData);
      b();
    });
  }
}

function b() {
  temp = JSON.stringify(finallyData);
  fs.writeFile('./data/finallyData.json', temp, (err) => {
    if (err) throw err;
  });
}
a();
// setTimeout(() => {
//   console.log('ghi');
//   b();
// }, 2000);
