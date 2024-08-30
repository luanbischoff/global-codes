const fs = require("fs"); // Module to handle file system operations
const xlsx = require("xlsx");

function readFileLines(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data.split(/\r?\n/);
  } catch (error) {
    console.error(`${error.message}`);
    setTimeout(() => process.exit(1), 5000);
  }
}

function writeToSpreadsheet(filePath, data) {
  let workbook;
  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
  } else {
    workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet([["CHAVE", "STATUS"]]);
    xlsx.utils.book_append_sheet(workbook, sheet, "Resultados");
  }

  const worksheet = workbook.Sheets["Resultados"];
  const newData = xlsx.utils.aoa_to_sheet(data, { origin: -1 });
  xlsx.utils.sheet_add_aoa(worksheet, data, { origin: -1 });
  xlsx.writeFile(workbook, filePath);
}

module.exports = { readFileLines, writeToSpreadsheet };
