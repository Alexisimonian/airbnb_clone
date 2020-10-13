class Feed {
  constructor() {
    this.list = new List();
    this.images = [
      "cabin1.jpg",
      "cabin1a.jpg",
      "cabin2.jpg",
      "cabin2a.jpg",
      "cabin3.jpg",
      "cabin4.jpg",
      "cabin4a.jpg",
      "cabin5.jpg",
      "cabin6.jpg",
      "cabin7.jpg",
      "cabin7a.jpg",
      "cabin8.jpg",
      "cabin9.jpg",
      "cabin10.jpg",
      "cabin10a.jpg",
    ];
  }

  init() {
    let i;
    for (i = 0; i < 10; i++) {
      this.list.create(
        "Perfect house",
        "€200/night",
        "Pretty litlle house in suburb",
        "20/09/2020 to 03/11/2020",
        `<img src="../public/images/${
          this.images[Math.floor(Math.random() * this.images.length)]
        }"/>`
      );
    }
  }

  view() {
    let view = new View(this.list);
    let element = document.getElementById("content");
    element.innerHTML = view.htmlList();
  }
}
