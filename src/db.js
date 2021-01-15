const mysql = require("mysql");

let connection = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
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
