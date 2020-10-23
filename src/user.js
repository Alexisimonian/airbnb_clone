const { dbQuery } = require("./db");

class User {
  existingEmails(email) {
    let query = dbQuery(`SELECT * FROM users WHERE email='${email}'`);
    return query;
  }

  existingUsernames(name) {
    let query = dbQuery(`SELECT * FROM users WHERE name='${name}'`);
    return query;
  }

  verifyThroughEmail(email) {
    let query = dbQuery(`SELECT * FROM users WHERE email='${email}'`);
    return query;
  }

  saveUser(username, email, password) {
    dbQuery(
      `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${password}')`
    );
  }
}
module.exports = { User };
