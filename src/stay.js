class Stay {
  constructor(id, user, address, price, availability, images, description) {
    this.id = id;
    this.user = user;
    this.address = address;
    this.price = price;
    this.availability = availability;
    this.images = images;
    this.description = description;
  }
}
module.exports = { Stay };
