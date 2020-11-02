class Stay {
  constructor(
    id,
    user,
    title,
    address,
    price,
    availableFrom,
    availableTo,
    images,
    description
  ) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.address = address;
    this.price = price;
    this.availableFrom = availableFrom;
    this.availableTo = availableTo;
    this.images = images;
    this.description = description;
  }
}
module.exports = { Stay };
