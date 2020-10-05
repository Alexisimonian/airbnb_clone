class Feed {
  constructor() {
    this.list = new List();
  }

  init() {
    let i;
    for (i = 0; i < 10; i++) {
      this.list.create(
        "Perfect house",
        "€200/night",
        "Pretty litlle house in suburb",
        "20/09/2020 to 03/11/2020",
        "image"
      );
    }
  }

  view() {
    let view = new View(this.list);
    let element = document.getElementById("content");
    element.innerHTML = view.htmlList();
  }
}
