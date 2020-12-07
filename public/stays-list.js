// Display each offers w/ corresponding images in a carousel
$.ajax({
  type: "get",
  url: "/stays",
  complete: function (xhr) {
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

    let logbtn = xhr.getResponseHeader("logbtn");
    $("#logbtn").text(`${logbtn}`);
    if (logbtn == "login") {
      $("#logbtn").after(
        "<a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }

    let homesList = JSON.parse(xhr.getResponseHeader("listing"));
    $.each(homesList, function (index, offer) {
      //Filters according to search params
      if (
        offer.locality == search_params["locality"] &&
        offer.country == search_params["country"] &&
        (search_params["start_date"] === "" ||
          offer.availableFrom <= search_params["start_date"]) &&
        (search_params["end_date"] === "" ||
          offer.availableTo >= search_params["end_date"]) &&
        (search_params["guests"] === "" ||
          offer.size >= search_params["guests"])
      ) {
        //Offer frame
        $("#content").append(
          `<div id='offer${index}'>
        <div id='carousel-nb${index}' class='carousel slide' data-interval='false' data-ride='carousel'>
          <div class='carousel-inner' id='carousel-inner-nb${index}'></div>
            <a class='carousel-control-prev' href='#carousel-nb${index}' role='button' data-slide='prev'>
              <span class='carousel-control-prev-icon' aria-hidden='true'></span>
              <span class='sr-only'>Previous</span>
            </a>
            <a class='carousel-control-next' href='#carousel-nb${index}' role='button' data-slide='next'>
              <span class='carousel-control-next-icon' aria-hidden='true'></span>
              <span class='sr-only'>Next</span>
            </a>
          </div>
        </div>`
        );

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

        //Offer text
        $("#offer" + index).append(
          `<div id='offer-text'>
          <h4>${offer.title}</h4>
          <p>${offer.price}€ /night</p>`
        );
      }
    });
  },
});

// Redirect to the new-stay form
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

//Map implementation
let map;
let service;
let infowindow;

function initMap() {
  const paris = new google.maps.LatLng(48.856697, 2.351462);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: paris,
    zoom: 15,
  });
  const request = {
    query: "Tour Eiffel",
    fields: ["name", "geometry"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}
