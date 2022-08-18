const fs = require("fs");
const utils = require("./utils");

const JsonConverter = (data) => {
  if (!data.length) {
    const err = new Error();
    err.name = "data Not Length";
    console.log(`${err}`.red);
  }

  const data_converter = [];

  data.forEach((item, index) => {
    const name = utils.convertToPersianChars(item.A);
    let gender;
    let rate;
    if (item.B == "1") gender = 1;
    if (item.C == "1") gender = 2;
    if (item.B == "1" && item.C == "1") gender = 3;
    if (utils.convertToPersianChars(item.D).includes("پرکاربرد")) rate = 1;
    if (utils.convertToPersianChars(item.D).includes("معمولی")) rate = 2;
    if (utils.convertToPersianChars(item.D).includes("بسیار نادر")) rate = 3;
    const json_model = {
      id: index + 1,
      name: name,
      gender: gender,
      rate: rate,
    };
    data_converter.push(json_model);
  });

  // create json file
  const path_file_save = "./database";
  const name_file_save = "database.json";
  const file = fs.createWriteStream(`${path_file_save}/${name_file_save}`);

  file.on("error", (err) => {
    console.log(`${err}`.red);
  });

  file.write(JSON.stringify(data_converter));

  file.end();

  console.log(
    `\ncreated and converted data to json => ${data.length} data\n`.green
  );
};

module.exports = JsonConverter;
