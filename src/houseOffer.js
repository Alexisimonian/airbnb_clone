class Offer {
  constructor(title, price, description, availability, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.availability = availability;
    this.image = image;
    this.id = undefined;
  }

  showDescription() {
    return this.description;
  }
}
module.exports = { Offer };
