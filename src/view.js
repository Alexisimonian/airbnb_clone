class View {
  constructor(list) {
    this.list = list;
  }

  htmlList() {
    let i;
    let htmlList = "";
    for (i = 0; i < 10; i++) {
      let singleOffer = [
        "<div id='offer'>" +
          "<li>" +
          this.list.houseList[i].title +
          "</li><li>" +
          this.list.houseList[i].price +
          "</li><li>" +
          this.list.houseList[i].image +
          "</li><li>" +
          this.list.houseList[i].availability +
          "</li><li>" +
          this.list.houseList[i].description +
          "</li><br>" +
          "<button type='button'>Book</button><button type='button'>View details</button>" +
          "<br></br>" +
          "</div>",
      ];
      htmlList += singleOffer;
    }
    return "<ul style='list-style-type:none;'>" + htmlList + "</ul>";
  }
}
