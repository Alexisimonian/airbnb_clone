class Stay {
  constructor(
    id,
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
    this.id = id;
    this.user = user;
    this.type = type;
    this.size = size;
    this.title = title;
    this.address = address;
    this.postcode = postcode;
    this.locality = locality;
    this.country = country;
    this.latlng = latlng;
    this.price = price;
    this.availableFrom = availableFrom;
    this.availableTo = availableTo;
    this.images = images;
    this.description = description;
  }
}
module.exports = { Stay };
