const fs = require("fs");
const path = require("path");

const directoryPath = "./assets/images";

const renameFilesSequentially = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      return;
    }

    files = files.filter((file) =>
      fs.statSync(path.join(dirPath, file)).isFile()
    );

    files.sort();

    files.forEach((file, index) => {
      const extname = path.extname(file);
      const newFilename = `${String(index + 1).padStart(2, "0")}${extname}`;

      const oldPath = path.join(dirPath, file);
      const newPath = path.join(dirPath, newFilename);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`Erro ao renomear o arquivo ${file}:`, err);
        } else {
          console.log(`Renomeado ${file} para ${newFilename}`);
        }
      });
    });
  });
};

renameFilesSequentially(directoryPath);
