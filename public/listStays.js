$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/stays",
    complete: function (xhr) {
      let logbtn = xhr.getResponseHeader("logbtn");
      $("#logbtn").html(`<a href='/${logbtn}'>${logbtn}</a>`);
      let homesList = JSON.parse(xhr.getResponseHeader("listing"));
      console.log(homesList);
      $.each(homesList, function (index, offer) {
        $("#content").append(
          "<div id='offer'>" +
            "<span id='images" +
            index +
            "'></span>" +
            "<p>" +
            offer.title +
            "</p>" +
            "<p>" +
            offer.price +
            " €/night</p>" +
            "<p>" +
            "</div>"
        );
        $.each(offer.images, function (i, image) {
          $("#images" + index).append(
            "<img  id='image' src='/photosOffers/" + offer.images[i] + "'>"
          );
        });
      });
    },
  });
  $("#createHome").click(function (e) {
    $.ajax({
      type: "get",
      url: "/stays",
      complete: function (xhr) {
        if (xhr.getResponseHeader("logbtn") == "logout") {
          window.location.href = "http://localhost:3000/stays/new";
        } else {
          $("#warning").text("you must login to continue");
        }
      },
    });
  });
});
