const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getDb = async function (path) {
  const data = await readFile(path, "utf8");
  return JSON.parse(data);
};

exports.postDb = async function (path, db) {
  const data = JSON.stringify(db);
  await writeFile(path, data);
};
