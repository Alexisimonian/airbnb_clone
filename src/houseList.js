class List {
  constructor() {
    this.houseList = [];
  }

  create(title, price, description, availability, image) {
    new Offer(title, price, description, availability, image);
  }
}
