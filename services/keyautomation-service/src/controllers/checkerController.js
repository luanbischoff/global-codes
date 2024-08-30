const axios = require("axios");
const { writeToSpreadsheet } = require("../utils/utils.js");
const { SHEET_PATH } = require("../config/index.js");
const { getRandomWlid } = require("../config/wlids.js");

const verificateBatch = async (req, res) => {
  const { batchId, keys } = req.body;

  if (!keys || keys.length === 0) {
    console.log("No codes found to verificate");
    return setTimeout(() => process.exit(1), 1500);
  }

  const results = [];

  while (keys.length > 0) {
    const code = keys.shift();
    if (code.length < 29) {
      console.log(`[-] ${code} is invalid!`);
      results.push([code, "INVALIDO"]);
      return;
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
        keys.unshift(code);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return;
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
};

const verificateKey = async (req, res) => {
  const { key } = req.body;

  try {
    if (!key) {
      throw new Error("No key found to verificate");
    }

    if (key.length < 29) {
      throw new Error("Key is incomplete");
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
        `https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${key}?market=US&language=en-US&supportMultiAvailabilities=true`,
        { headers }
      );
      const data = response.data;

      if ("tokenState" in data) {
        const { tokenState } = data;

        switch (tokenState) {
          case "Active": {
            res.send({
              key,
              status: "Active",
            });
            break;
          }
          case "Inactive": {
            res.send({
              key,
              status: "Inactive",
            });
            break;
          }
          default: {
            throw new Error(`Unknown token state: ${tokenState}`);
          }
        }
      }
    } catch (error) {
      if (error.status === 429) {
        return res.send({ status: 429, message: "Ratelimit reached." });
      }
      const data = error.response.data;
      const { code: errorCode } = data?.innererror;

      switch (errorCode) {
        case "TokenNotFound":
          res.send({
            key,
            status: "Invalid",
          });
          break;
        case "RiskPolicyRejected":
          res.send({
            key,
            status: "Redeemed/Deactivated",
          });
          break;
        case "AuthenticationFailure":
          res.send({
            error: "Invalid WLID",
            statusCode: error.status,
          });
          break;
        case "AuthenticationTokenInvalid":
          res.send({
            error: "Expired WLID",
            statusCode: error.status,
          });
          break;
        default:
          res.send({
            error: error.message,
            statusCode: error.status,
          });
          break;
      }
    }
  } catch (error) {
    return res.send({
      error: error.message,
      statusCode: error.status,
    });
  }
};

module.exports = { verificateBatch, verificateKey };
