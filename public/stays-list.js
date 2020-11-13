$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/stays",
    complete: function (xhr) {
      let logbtn = xhr.getResponseHeader("logbtn");
      $("#logbtn").html(`<a href='/${logbtn}'>${logbtn}</a>`);
      let homesList = JSON.parse(xhr.getResponseHeader("listing"));
      $.each(homesList, function (index, offer) {
        $("#content").append(
          "<div id='offer" +
            index +
            "'>" +
            "<div id='carousel-nb" +
            index +
            "' class='carousel slide' data-interval='false' data-ride='carousel'>" +
            "<div class='carousel-inner' id='carousel-inner-nb" +
            index +
            "'></div>" +
            "<a class='carousel-control-prev' href='#carousel-nb" +
            index +
            "' role='button' data-slide='prev'>" +
            "<span class='carousel-control-prev-icon' aria-hidden='true'></span>" +
            "<span class='sr-only'>Previous</span>" +
            "</a>" +
            "<a class='carousel-control-next' href='#carousel-nb" +
            index +
            "' role='button' data-slide='next'>" +
            "<span class='carousel-control-next-icon' aria-hidden='true'></span>" +
            "<span class='sr-only'>Next</span>" +
            "</a>" +
            "</div>" +
            "</div>"
        );
        $.each(offer.images, function (i, image) {
          let active = "";
          if (i === 0) {
            active = " active";
          }
          $("#carousel-inner-nb" + index).append(
            "<div class='carousel-item" +
              active +
              "'>" +
              "<img src='/photosOffers/" +
              offer.images[i] +
              "' class='d-block w-100'>" +
              "</div>"
          );
        });

        $("#offer" + index).append(
          "<div id='offer-text'>" +
            "<p>" +
            offer.title +
            "</p>" +
            "<p>" +
            offer.price +
            " € /night</p>"
        );
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
          $("#warning").html(
            "<div class='alert alert-warning' role='alert'>You must login to continue</div>"
          );
        }
      },
    });
  });
});
