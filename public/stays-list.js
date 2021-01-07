//Map implementation
let map;
let marker;
let homesList;

function initMap() {
  const center = new google.maps.LatLng(48.862725, 2.287592);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
  });
  marker = new google.maps.Marker({ map: map });
}

//Place markers and change map center
function changeCenter(center) {
  map.setCenter(center);
  marker.setPosition(center);
}

$(document).on("mouseover", ".offer", function () {
  let offer_id = this.id.split("offer")[1];
  let latlng = homesList[offer_id].latlng.split(",");
  let center = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
  changeCenter(center);
});

//Determins search params
let search_infos = window.location.href.split("?")[1].split("&");

const search_params = {
  locality: "",
  country: "",
  start_date: "",
  end_date: "",
  guests: "",
};

$.each(search_infos, function (i, info) {
  let val = info.split("=");
  for (const param in search_params) {
    if (param == val[0]) {
      search_params[param] = val[1];
    }
  }
});

// Display each offers w/ corresponding images in a carousel
$.ajax({
  type: "get",
  url: "/stays",
  complete: function (xhr) {
    //Sets navbar btn
    let logbtn = xhr.getResponseHeader("logbtn");
    $("#logbtn").text(`${logbtn}`);
    if (logbtn == "login") {
      $("#logbtn").attr("href", "#");
      $("#logbtn").attr("data-toggle", "modal");
      $("#logbtn").attr("data-target", "#logmodal");
      $("#logbtn").after(
        "<a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").attr("href", "/logout");
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }

    homesList = JSON.parse(xhr.getResponseHeader("listing"));
    let foundsmth = 0;
    $.each(homesList, function (index, offer) {
      //Filters according to search params
      if (
        offer.country == search_params["country"] &&
        (search_params["locality"] === "" ||
          offer.locality == search_params["locality"]) &&
        (search_params["start_date"] === "" ||
          offer.availableFrom <= search_params["start_date"]) &&
        (search_params["end_date"] === "" ||
          offer.availableTo >= search_params["end_date"]) &&
        (search_params["guests"] === "" ||
          offer.size >= search_params["guests"])
      ) {
        foundsmth += 1;

        //Offer frame
        $("#headrow").after(
          `<tr><td class='offer' id='offer${index}'>
            <table id='offer'><tr><td id='image-col' rowspan='3'>
              <div id='carousel-nb${index}' class='carousel slide' data-interval='false' data-ride='carousel'>
              <div class='carousel-inner' id='carousel-inner-nb${index}'></div>
                <a class='carousel-control-prev' id='prev-control${index}' href='#carousel-nb${index}' role='button' data-slide='prev'>
                  <span class='carousel-control-prev-icon' aria-hidden='true'></span>
                  <span class='sr-only'>Previous</span>
                </a>
                <a class='carousel-control-next' id='next-control${index}' href='#carousel-nb${index}' role='button' data-slide='next'>
                  <span class='carousel-control-next-icon' aria-hidden='true'></span>
                  <span class='sr-only'>Next</span>
                </a>
              </div>
            </td><td id='title' colspan='3'>
              <h4>${offer.title}</h4>
            </td></tr><tr><td>
              <p>${offer.price}€ /night</p>
            </td><td>
              <p>${offer.type}</p>
            </td><td>
              <p>${offer.size} guests</p>
            </tr><tr><td id='description' colspan='3'>
              <p>${offer.description}</p>
            </td></tr></table></td></a></tr>`
        );

        //Get rid of carousel controls if only one image
        if (offer.images.length == 1) {
          $("#prev-control" + index).remove();
          $("#next-control" + index).remove();
        }

        //Offer image
        $.each(offer.images, function (i, image) {
          let active = "";
          if (i === 0) {
            active = " active";
          }
          $("#carousel-inner-nb" + index).append(
            `<div class='carousel-item${active}'>
            <img src='/photosOffers/${offer.images[i]}' class='d-block w-100'>
          </div>`
          );
        });
      }
    });
    if (foundsmth == 0) {
      $("#headrow").after(
        `<tr><td>We're sorry, there's currently no stay at that destination :( </td></tr>`
      );
    }
  },
});

//Login implementation
$("#login").click(function () {
  $("#login-form").submit();
});

$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid");
});

$("#login-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $(":input").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("is-invalid");
    }
  });

  if ($(this).find(".is-invalid").length == 0) {
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
      success: function () {
        window.location.href = "http://localhost:3000/";
      },
      error: function (data) {
        if (data.responseText == "email incorrect") {
          $("#email_input").addClass("is-invalid");
          $("#invalid-email").text("No account with this email address.");
        } else if (data.responseText == "password incorrect") {
          $("#password_input").addClass("is-invalid");
          $("#invalid-password").text("Password incorrect.");
        }
      },
    });
  }
});
