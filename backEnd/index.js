// get data from database
require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const getDatabase = async (results) => {
  const response = await notion.databases.query({ database_id: databaseId });

  results = response.results;
  data = JSON.stringify(results);
  fs.writeFile('./data/results.json', data, (err) => {
    if (err) throw err;
  });
  return results;
};

const trimData = (results) => {
  const data = results.map((result) => {
    return {
      id: result.id,
      title: result.properties.Title.title[0].plain_text,
      url: result.url,
    };
  });

  return data;
};
let results;
getDatabase(results)
  .then((data) => {
    console.log(trimData(data));
    temp = JSON.stringify(trimData(data));
    fs.writeFile('./data/trimData.json', temp, (err) => {
      if (err) throw err;
    });
  })
  .catch((err) => {
    console.log(err);
  });
