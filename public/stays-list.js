//Map implementation
let map;
let marker;
let geocoder;
let homesList;
let center;
let fulloffer;
let booked;
let bookedids = new Array();

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

function initMap() {
  const center = new google.maps.LatLng(48.862725, 2.287592);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 13,
  });
  marker = new google.maps.Marker({ map: map });
  geocoder = new google.maps.Geocoder();
  setFirstCenter();
}

function setFirstCenter() {
  if (search_params["locality"] === "") {
    geocoder.geocode(
      { address: search_params["country"].replace("%20", " ") },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
        }
      }
    );
    map.setZoom(6);
  } else {
    geocoder.geocode(
      { address: search_params["locality"].replace("%20", " ") },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
        }
      }
    );
  }
}

//Place markers and change map center
function changeCenter(center) {
  map.setCenter(center);
  marker.setPosition(center);
}

$(document).on("mouseover", ".offer", function () {
  let offer_id = this.id.split("offer")[1];
  let latlng = homesList[offer_id].latlng.split(",");
  let newcenter = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
  changeCenter(newcenter);
});

$(document).on("mouseout", ".offer", function () {
  map.setCenter({ lat: 48.862725, lng: 2.287592 });
  marker.setPosition(null);
});

$(document).on("click", ".offer", function (e) {
  if (
    !$(e.target).hasClass("carousel-control-prev-icon") &&
    !$(e.target).hasClass("carousel-control-next-icon") &&
    !$(e.target).hasClass("carousel-control-next") &&
    !$(e.target).hasClass("carousel-control-prev")
  ) {
    $(".bigcarousel-controls").show();
    let offer_id = this.id.split("offer")[1];
    fulloffer = homesList[offer_id];
    $("#offertitle").text(fulloffer.title);
    let offerimages = fulloffer.images;
    $("#big-image").empty();
    if (offerimages.length == 1) {
      $(".bigcarousel-controls").hide();
    }
    $.each(offerimages, function (index, element) {
      let active = "";
      if (index === 0) {
        active = " active";
      }
      $("#big-image").append(
        `<div class='carousel-item${active}'>
          <img src='/photosOffers/${element}'/>
        </div>`
      );
    });
    $("#offeraddress").html(
      `<strong>Address:</strong> ${fulloffer.address}, ${fulloffer.postcode}, ${fulloffer.locality}, ${fulloffer.country}`
    );
    $("#offerprice").html(`<strong>price:</strong> ${fulloffer.price}€/night`);
    $("#offersize").html(`<strong>Size:</strong> ${fulloffer.size} guests`);
    $("#offertype").html(`<strong>Place type:</strong> ${fulloffer.type}`);
    $("#offerdescription").html(
      `<strong>Descritption:</strong> ${fulloffer.description}`
    );
    $("#offermodal").modal();
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
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").attr("href", "/logout");
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }

    homesList = JSON.parse(xhr.getResponseHeader("listing"));
    booked = JSON.parse(xhr.getResponseHeader("booked"));
    let foundsmth = 0;
    $.each(booked, function (indx, elem) {
      bookedids.push(elem.stay);
    });
    $.each(homesList, function (index, offer) {
      //Filters according to search params
      if (
        offer.country == search_params["country"].replace("%20", " ") &&
        (search_params["locality"] === "" ||
          offer.locality == search_params["locality"].replace("%20", " ")) &&
        (search_params["start_date"] === "" ||
          offer.availableFrom <= search_params["start_date"]) &&
        (search_params["end_date"] === "" ||
          offer.availableTo >= search_params["end_date"]) &&
        (search_params["guests"] === "" ||
          offer.size >= search_params["guests"])
      ) {
        foundsmth += 1;

        if ($.inArray(offer.id, bookedids) == -1) {
          //Offer frame
          $("#headrow").after(
            `<tr><td class='offer' id='offer${index}'>
            <table id='offer'><tr><td id='image-col' rowspan='3'>
              <div id='carousel-nb${index}' class='carousel slide small-carousel' data-interval='false' data-ride='carousel'>
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
              `<div class='carousel-item${active}' id='small-image'>
            <img src='/photosOffers/${offer.images[i]}'>
          </div>`
            );
          });
        }
      }
    });
    if (foundsmth == 0) {
      $("#headrow").after(
        `<tr><td>We're sorry, there's currently no stay at that destination.
        <br/>To see some stay example, please add a stay or search for either Paris or France between January and March.
        </td></tr>`
      );
    }
    if (bookedids.length == homesList.length) {
      $("#headrow").after(
        `<tr><td>You booked all the example stays. You can unbook them on your account page.</td></tr>`
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
        location.reload();
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

//Become host btn only available to loggedin users
$("#becomehostbtn").click(function (e) {
  e.preventDefault();
  if ($("#logbtn").text() == "login") {
    $("#logmodal").modal();
  } else {
    window.location.href = "/stays/new";
  }
});

$("#bookingbtn").click(function () {
  if ($("#logbtn").text() == "login") {
    $("#offermodal").modal("hide");
    $("#logmodal").modal();
  } else {
    let data = {
      stayid: fulloffer.id,
      price: fulloffer.price,
      start: fulloffer.availableFrom,
      end: fulloffer.availableTo,
    };
    $.ajax({
      type: "POST",
      url: "/stays/book",
      data: data,
      complete: function () {
        $("#offermodal").modal("hide");
        alert(
          "Stay successfully booked. You can see or cancel your bookings on your account's page"
        );
        location.reload();
      },
    });
  }
});
