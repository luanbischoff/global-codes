const vision = require("@google-cloud/vision");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const client = new vision.ImageAnnotatorClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Digite o nome do arquivo para salvar as chaves (sem extensão): ",
  async (fileName) => {
    const outputFileName = `./generated/${fileName}.txt`;
    const folderPath = "./assets/images";

    const allKeys = [];
    const filesWithLessThan10Keys = [];

    try {
      const files = fs.readdirSync(folderPath);
      const onlyImageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|tif)$/i.test(file)
      );

      for (const file of onlyImageFiles) {
        const filePath = path.join(folderPath, file);
        console.log(`Processando: ${filePath}`);

        try {
          const [result] = await client.documentTextDetection(filePath);
          const fullTextAnnotation = result.fullTextAnnotation;

          const regex =
            /\b[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}\b/g;
          const matches = fullTextAnnotation.text.match(regex);

          if (matches) {
            console.log(
              `Chaves encontradas em ${file}:`,
              matches,
              matches.length
            );
            allKeys.push(...matches);

            if (matches.length < 10) {
              filesWithLessThan10Keys.push(file);
              let notFoundQuantity = 10 - matches.length;
              for (let i = 0; i < notFoundQuantity; i++) {
                allKeys.push("");
              }
            }
          } else {
            console.log(`Nenhuma chave encontrada em ${file}`);
            filesWithLessThan10Keys.push(file);
          }
        } catch (error) {
          console.error(`Erro ao processar ${file}:`, error);
          filesWithLessThan10Keys.push(file);
        }
      }

      if (allKeys.length > 0) {
        fs.writeFileSync(outputFileName, allKeys.join("\n"), "utf8");
        console.log(
          `Arquivo salvo com sucesso como ${outputFileName}. Total de chaves: ${allKeys.length}`
        );
      } else {
        console.log("Nenhuma chave foi encontrada em todas as imagens.");
      }

      if (filesWithLessThan10Keys.length > 0) {
        console.log("As seguintes fotos não encontraram o total de 10 chaves:");
        console.log(filesWithLessThan10Keys.join("\n"));
      } else {
        console.log("Todas as fotos encontraram pelo menos 10 chaves.");
      }
    } catch (error) {
      console.error("Erro ao processar as imagens:", error);
    } finally {
      rl.close();
    }
  }
);
