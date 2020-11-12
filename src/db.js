const credentials = require("./credentials.js");
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: credentials.sqlusername,
  password: credentials.sqlpassword,
  database: credentials.sqldb,
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
