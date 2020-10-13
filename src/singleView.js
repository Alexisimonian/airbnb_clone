class singleView {
  constructor(offer) {
    this.offer = offer;
  }

  viewOffer() {
    let singleOffer = [
      "<li>" +
        this.offer.title +
        "</li><li>" +
        this.offer.price +
        "</li><li>" +
        this.offer.image +
        "</li><li>" +
        this.offer.availability +
        "</li><li>" +
        this.offer.description +
        "</li><br>",
    ];
    return singleOffer;
  }
}
