require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs/promises");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const trimData = require("./data/trimData.json");

async function getPageContent(blockId) {
  try {
    const response = await notion.blocks.children.list({ block_id: blockId });
    return response.results;
  } catch (error) {
    console.error(`Error fetching page content: ${error.message}`);
    return [];
  }
}

function extractYoutubeVideoId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

async function processPageData(pageData) {
  const videoIdPromises = pageData.map(async (item) => {
    if (item.type === "video") {
      return extractYoutubeVideoId(item.video.external.url);
    }
    return null;
  });

  const videoIds = await Promise.all(videoIdPromises);
  return videoIds.filter((id) => id !== null);
}

async function main() {
  try {
    const processedData = await Promise.all(
      trimData.map(async (item) => {
        const pageContent = await getPageContent(item.id);
        const videoIds = await processPageData(pageContent);

        return {
          title: item.title,
          url: item.url,
          videoIds,
        };
      })
    );

    const outputPath = "./data/finallyData.json";
    await fs.writeFile(outputPath, JSON.stringify(processedData, null, 2));
    console.log(`Processed data saved to ${outputPath}`);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();
