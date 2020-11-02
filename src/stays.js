const { dbQuery } = require("./db");
const { Stay } = require("./stay");

class Stays {
  constructor() {
    this.houses = [];
  }

  createStay(
    user,
    title,
    address,
    price,
    availableFrom,
    availableTo,
    images,
    description
  ) {
    dbQuery(
      `INSERT INTO stays (user, title, address, price, availability, images, description) 
      VALUES ('${user}','${title}' '${address}', '${price}', '${availableFrom}', '${availableTo}', '${images}', '${description}')`
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
          query[i].title,
          query[i].address,
          query[i].price,
          query[i].availableFrom,
          query[i].availableTo,
          query[i].images,
          query[i].description
        )
      );
    }
    return this.houses;
  }
}
module.exports = { Stays };
