require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs/promises");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

const fetchDataFromNotion = async () => {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    const data = response.results.map((result) => ({
      id: result.id,
      title: result.properties.Title.title[0].plain_text,
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
