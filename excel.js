const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const convertExcelToJson = async (
  pathFile,
  options = {
    sheet: "FirstNames",
    sheetStubs: true,
    range: "A2:D9000",
  }
) => {
  if (!pathFile || !fs.existsSync(pathFile)) {
    const err = new Error();
    err.name = "FileInvalid";
    throw err;
  }

  const workbook = await excelToJson({
    sourceFile: pathFile,
    sheetStubs: options.sheetStubs,
    sheets: [
      {
        name: options.sheet,
        range: options.range,
      },
    ],
  });

  return workbook[options.sheet];
};

module.exports = {
  convertExcelToJson,
};
