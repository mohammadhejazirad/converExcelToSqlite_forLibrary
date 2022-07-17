const colors = require("colors");
const fs = require("fs");
const sortArray = require("sort-array");
const excel = require("./excel");
const utils = require("./utils");
const Database = require("./database");

const path_file_excel = "./assets/FirstNames.xls";

if (!fs.existsSync(path_file_excel)) {
  console.log(`file excel not found: ${path_file_excel}`.red);
  return;
}

(async () => {
  const data = await excel.convertExcelToJson(path_file_excel);
  let data_for_database = [];

  data.forEach((item) => {
    const column = {
      name: utils.convertToPersianChars(item.A),
      man: item.B == "1" ? true : false,
      woman: item.C == "1" ? true : false,
      rate: utils.convertToPersianChars(item.D),
    };

    data_for_database.push(column);
  });

  data_for_database = sortArray(data_for_database, {
    by: "name",
  });

  try {
    await Database.dataToDatabase(data_for_database, true, true);
    console.log(
      `\n
       created and converted data to database => ${data.length} data
       \n
       `.green
    );
  } catch (error) {
    console.log(
      `
      \n
      Error Convert To Db:
      ${error}
      \n`.red
    );
  }
})();
