const dbId = require("./dbInfos.js");
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: dbId.username,
  password: dbId.password,
  database: "Airbnb_clone_test",
});

function dbQuery(request) {
  return new Promise(function (resolve, reject) {
    connection.query(request, function (err, result, field) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports.dbQuery = dbQuery;
