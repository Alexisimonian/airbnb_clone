const { dbQuery } = require("./db");
const { Stay } = require("./stay");

class Stays {
  constructor() {
    this.houses = [];
  }

  createStay(user, address, price, availability, images, description) {
    dbQuery(
      `INSERT INTO stays (user, address, price, availability, images, description) 
      VALUES ('${user}', '${address}', '${price}', '${availability}', '${images}', '${description}')`
    );
  }

  deleteStay(stayId) {
    dbQuery(`DELETE FROM stays WHERE id='${stayId}'`);
  }

  async listingStays() {
    let query = await dbQuery("SELECT * FROM stays");
    for (let i = 0; i < query.length; i++) {
      this.houses.push(
        new Stay(
          query[i].id,
          query[i].user,
          query[i].address,
          query[i].price,
          query[i].availability,
          query[i].images,
          query[i].description
        )
      );
    }
    return this.houses;
  }
}
module.exports = { Stays };
