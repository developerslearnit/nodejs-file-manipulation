const fs = require("fs").promises;
const readJsonFileAsync = async (filename) => {
  try {
    const data = await fs.readFile(filename, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = readJsonFileAsync;
