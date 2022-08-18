const fs = require("fs");
const Database = require("better-sqlite3");

const addressDbSave = "./database";
const nameDbSave = "/database.sqlite";

if (!fs.existsSync(addressDbSave)) {
  fs.mkdirSync(addressDbSave);
}

const db_sqlite = new Database(addressDbSave + nameDbSave);

const dataToDatabase = async (params, consoleLog, removeOldFile) => {
  if (removeOldFile && fs.existsSync(addressDbSave + nameDbSave)) {
    fs.unlinkSync(addressDbSave + nameDbSave);
  }
  const db = new Database(addressDbSave + nameDbSave, {
    verbose: consoleLog ? console.warn : undefined,
  });
  db.exec(
    "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(25) NOT NULL, gender INTEGER NOT NULL,rate INTEGER NOT NULL)"
  );

  params = findRepeatName(params);

  params.forEach(async (item) => {
    await db
      .prepare("INSERT INTO names (name, gender, rate) VALUES (?,?,?)")
      .run(item.name, item.gender, item.rate);
  });
};

const getAllNames = () => {
  const data = db_sqlite.prepare(`SELECT name, gender, rate FROM names`).all();
  return data;
};

const findName = (name) => {
  const data = db_sqlite
    .prepare(`SELECT name, gender, rate FROM names WHERE name = (?)`)
    .get(name);
  return data;
};

const findRepeatName = (data) => {
  if (!data || !data.length) return;
  data = data.filter((item, index) => data.indexOf(item.name) != index);
  return data;
};

module.exports = {
  dataToDatabase,
  getAllNames,
  findName,
};
