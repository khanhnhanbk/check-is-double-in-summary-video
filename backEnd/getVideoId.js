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

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

finallyData = [];

function a() {
  for (let i = 0; i < data.length; i++) {
    let tempData = {
      title: data[i].title,
      url: data[i].url,
      videoId: null,
    };
    getPageContent(data[i].id).then((res, rax) => {
      // console.log(res);
      // file item has type == 'video' in res
      res.forEach((item) => {
        if (item.type === 'video') {
          if (tempData.videoId == null) {
            tempData.videoId = youtube_parser(item.video.external.url);
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
