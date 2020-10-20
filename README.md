      if (result.length > 0) {
        res.send("Username already used");
      } else {
        connection.query(
          `SELECT FROM users WHERE email = '${email}'`,
          function (err, result, fields) {
            if (result.length > 0) {
              res.send("Email already used.");
            } else {
              connection.query(
                `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${password}')`,
                function (err, result, fields) {
                  if (err) throw err;
                  console.log(result);
                }
              );
            }
          }
        );
      }
      res.end();
    });
  }
});