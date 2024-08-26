const fs = require("fs");
const csv = require("csv-parser");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const codes = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        codes.push(row.code);
      })
      .on("end", () => {
        resolve(codes);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = { parseCSV };
