class List {
  constructor() {
    this.houseList = [];
    this.accumulator = 0;
  }

  create(title, price, description, availability, image) {
    let offer = new Offer(title, price, description, availability, image);
    offer.id = this.accumulator;
    this.houseList.push(offer);
    this.accumulator += 1;
  }
}
module.exports = { List };
