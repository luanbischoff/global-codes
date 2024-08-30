const { readFileLines } = require("../utils/utils.js");
const { WLID_PATH } = require("./index.js");

const wlids = readFileLines(WLID_PATH);
if (!wlids || wlids.length === 0) {
  console.log("No WLIDs found");
  setTimeout(() => process.exit(1), 5000);
}

const formattedWlids = wlids.map((w) =>
  w.startsWith("WLID1.0=") ? w : `WLID1.0="${w}"`
);

function getRandomWlid() {
  return formattedWlids[Math.floor(Math.random() * formattedWlids.length)];
}

module.exports = { getRandomWlid };
