const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const sortArray = require("sort-array");

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

  const result = workbook[options.sheet];
  return sortArray(result, {
    by: "A",
  });
};

module.exports = {
  convertExcelToJson,
};
