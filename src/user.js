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

  saveUser(username, email, password) {
    let query = dbQuery(
      `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${password}')`
    );
    return query;
  }

  async getID(username) {
    let query = await dbQuery(`SELECT id FROM users WHERE name='${username}'`);
    return query[0].id;
  }
}

module.exports = { User };
