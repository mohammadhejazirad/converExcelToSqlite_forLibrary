const utils = require("./utils");
const Database = require("./database");

const sqliteConverter = async (data) => {
  if (!data.length) return console.log("data Not Length".red);

  let data_for_database = [];
  data.forEach((item) => {
    const name = utils.convertToPersianChars(item.A);
    let gender;
    let rate;
    if (item.B == "1") gender = 1;
    if (item.C == "1") gender = 2;
    if (item.B == "1" && item.C == "1") gender = 3;
    if (utils.convertToPersianChars(item.D).includes("پرکاربرد")) rate = 1;
    if (utils.convertToPersianChars(item.D).includes("معمولی")) rate = 2;
    if (utils.convertToPersianChars(item.D).includes("بسیار نادر")) rate = 3;

    const data_model = {
      name: name,
      gender: gender,
      rate: rate,
    };
    data_for_database.push(data_model);
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
};

module.exports = sqliteConverter;
