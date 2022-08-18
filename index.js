const colors = require("colors"); //for color consoleLog
const prompts = require("prompts");
const fs = require("fs");
const excel = require("./excel");
const JsonConverter = require("./jsonConverter");
const sqliteConverter = require("./sqliteConverter");

const path_file_excel = "./assets/FirstNames.xls";

if (!fs.existsSync(path_file_excel))
  return console.log(`file excel not found: ${path_file_excel}`.red);

(async () => {
  const terminal = await prompts({
    type: "select",
    name: "value",
    message: "select export format data :",
    choices: [
      { title: "json", value: "json" },
      { title: "sqlite", value: "sqlite" },
    ],
    initial: 0,
  });

  const data = await excel.convertExcelToJson(path_file_excel);

  if (terminal.value === "json") {
    await JsonConverter(data);
  } else {
    await sqliteConverter(data);
  }
})();
