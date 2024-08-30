const axios = require("axios");
const { readFileLines, writeToSpreadsheet } = require("./src/util/utils.js");
const { KEYS_PATH, SHEET_PATH } = require("./src/config/index.js");
const { getRandomWlid } = require("./src/config/wlids.js");

async function getProductTitle(productId) {
  const url = `https://displaycatalog.mp.microsoft.com/v7.0/products/${productId}/?fieldsTemplate=InstallAgent&market=US&languages=en-US,en,neutral`;
  try {
    const response = await axios.get(url);
    const product = response.data.Product || {};
    const localizedProperties = product.LocalizedProperties || [{}];
    return localizedProperties[0].ProductTitle || "Unknown Product";
  } catch (error) {
    console.error(`Error fetching product title: ${error.message}`);
    return "Unknown Product";
  }
}

async function main() {
  console.clear();
  console.log(
    "\n ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗\n██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║\n██║  ███╗██║     ██║   ██║██████╔╝███████║██║\n██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║\n╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗\n ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝\n\n ██████╗ █████╗ ██████╗ ██████╗ ███████╗\n██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝\n██║     ███████║██████╔╝██║  ██║███████╗\n██║     ██╔══██║██╔══██╗██║  ██║╚════██║\n╚██████╗██║  ██║██║  ██║██████╔╝███████║\n ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝\n\n- This tool is in version 1.0.0 \n- Currently under development.                  \n"
  );

  let codes = readFileLines(KEYS_PATH);
  if (!codes || codes.length === 0) {
    console.log("No codes found in input\\codes.txt");
    return setTimeout(() => process.exit(1), 1500);
  }

  const results = [];

  while (codes.length > 0) {
    const code = codes.shift();
    if (code.length < 29) {
      console.log(`[-] ${code} is invalid!`);
      results.push([code, "INVALIDO"]);
      continue;
    }

    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.8",
      authorization: getRandomWlid(),
      origin: "https://www.microsoft.com",
      referer: "https://www.microsoft.com/",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    };

    try {
      const response = await axios.get(
        `https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`,
        { headers }
      );
      const data = response.data;

      if ("tokenState" in data) {
        const tokenState = data.tokenState;
        if (tokenState === "Active") {
          const universalStoreBigId =
            data.universalStoreBigIds[0].split("/")[0];
          const productTitle = await getProductTitle(universalStoreBigId);
          console.log("\x1b[32m" + `[+] ${code.slice(0, 17)}-XXXXX-XXXXX OK!`);
          results.push([code, `OK`]);
        } else if (tokenState === "Inactive") {
          console.log(
            "\x1b[32m" + `[!] ${code.slice(0, 17)}-XXXXX-XXXXX is inactive!`
          );
          results.push([code, "Inativo"]);
        }
      } else {
        console.log("\x1b[31m" + `[-] Error: ${JSON.stringify(data)}`);
        results.push([code, "Error"]);
      }
    } catch (error) {
      if (error.status === 429) {
        console.log("\x1b[33m" + "[-] Ratelimit! Pausing for 10 seconds...");
        codes.unshift(code);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        continue;
      }
      const data = error.response.data;
      const { code: errorCode } = data?.innererror;

      switch (errorCode) {
        case "TokenNotFound":
          console.log(
            "\x1b[31m" + `[-] ${code.slice(0, 17)}-XXXXX-XXXXX is invalid!`
          );
          results.push([code, "INVALIDO"]);
          break;
        case "RiskPolicyRejected":
          console.log(
            "\x1b[31m" +
              `[!] ${code.slice(0, 17)}-XXXXX-XXXXX is deactivated OR redeemed!`
          );
          results.push([code, "Desativado/Resgatado"]);
          break;
        case "AuthenticationFailure":
          console.log("\x1b[31m" + "[!] Error: Invalid WLID");
          results.push([code, "Unauthorized"]);
          setTimeout(() => process.exit(1), 5000);
          break;
        default:
          console.log("\x1b[31m" + `[!] Error: ${error.message}`);
          results.push([code, `Erro`]);
          break;
      }
    }

    writeToSpreadsheet(SHEET_PATH, results);
    results.length = 0;

    // await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("\nFinished checking codes!");
}

main();
