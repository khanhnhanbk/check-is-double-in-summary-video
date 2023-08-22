require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs/promises");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;
// Get all pages and update url each page
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const fetchDataFromNotion = async () => {
  try {
    const results = [];
    let next_cursor = undefined;
    while (true) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: next_cursor,
      });
      results.push(...response.results);
      next_cursor = response.next_cursor;
      if (next_cursor === null) {
        break;
      }
      sleep(300);
    }
    const data = results.map((result) => ({
      id: result.id,
      title: result.properties.Title.title[0]?.plain_text,
      url: result.url,
    }));
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data from Notion: " + error.message);
  }
};

const saveDataToFile = async (data, filePath) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    throw new Error("Failed to save data to file: " + error.message);
  }
};

(async () => {
  try {
    const data = await fetchDataFromNotion();
    const trimmedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
    }));

    console.log(trimmedData);

    await saveDataToFile(data, "./data/results.json");
    await saveDataToFile(trimmedData, "./data/trimData.json");
  } catch (error) {
    console.error(error);
  }
})();
