const { dbQuery } = require("./db");
const { Stay } = require("./stay");

class Stays {
  constructor() {
    this.houses = [];
  }

  createStay(
    user,
    type,
    size,
    title,
    address,
    postcode,
    locality,
    country,
    latlng,
    price,
    availableFrom,
    availableTo,
    images,
    description
  ) {
    dbQuery(
      `INSERT INTO stays (user, type, size, title, address, postcode, locality, country, latlng, price, availablefrom, availableto, images, description) 
      VALUES ('${user}','${type}','${size}','${title}', '${address}', '${postcode}','${locality}','${country}','${latlng}', '${price}', '${availableFrom}', '${availableTo}', '${images}', '${description}')`
    );
  }

  deleteStay(stayId) {
    dbQuery(`DELETE FROM stays WHERE id='${stayId}'`);
  }

  findStay(id) {
    let query = `SELECT * FROM stays WHERE id='${id}'`;
    return query;
  }

  book(userid, stayid, price, start, end) {
    dbQuery(
      `INSERT INTO bookings (user, stay, price, start, end) VALUES ('${userid}', '${stayid}', '${price}', '${start}', '${end}')`
    );
  }

  async listingStays() {
    this.houses = [];
    let query = await dbQuery("SELECT * FROM stays");
    for (let i = 0; i < query.length; i++) {
      let images = query[i].images.split(",");
      this.houses.push(
        new Stay(
          query[i].id,
          query[i].user,
          query[i].type,
          query[i].size,
          query[i].title,
          query[i].address,
          query[i].postcode,
          query[i].locality,
          query[i].country,
          query[i].latlng,
          query[i].price,
          query[i].availablefrom,
          query[i].availableto,
          images,
          query[i].description
        )
      );
    }
    return this.houses;
  }
}

module.exports = { Stays };
