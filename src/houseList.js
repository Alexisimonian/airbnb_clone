import Offer from "./houseOffer";

export default class List {
  constructor() {
    this.houseList = [];
  }

  create(title, price, description, availability, address, image) {
    this.houseList.push(
      new Offer(title, price, description, availability, address, image)
    );
  }
}
