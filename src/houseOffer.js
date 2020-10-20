export default class Offer {
  constructor(title, price, description, availability, address, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.availability = availability;
    this.image = image;
    this.address = address;
    this.id = undefined;
  }
}