let booking_ordered = new Array();

$.ajax({
  type: "GET",
  url: "/account",
  complete: function (xhr) {
    let user = JSON.parse(xhr.getResponseHeader("user"));
    user = user[0];
    let bookings = JSON.parse(xhr.getResponseHeader("bookings"));
    let stays = JSON.parse(xhr.getResponseHeader("stays"));
    let logbtn = xhr.getResponseHeader("logbtn");

    //Log button
    $("#logbtn").text(`${logbtn}`);
    $("#logbtn").attr("href", `/${logbtn}`);
    if (logbtn == "login") {
      $("#logbtn").after(
        "<a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }

    //Account information
    $("#account_name").text(user.name);
    $("#account_email").text(user.email);
    $("#account_photo").html(
      `<img src='https://airbnbcloneavatarsas.s3.amazonaws.com/${user.avatar}'/>`
    );

    //Bookings information
    if (bookings.length == 0) {
      $("#incomingtrip").after(
        "<tr class='field'><td>Nothing to show. Book your next holidays !</td></tr>"
      );
    } else {
      $.each(bookings, function (i, elem) {
        booking_ordered.push(elem);
        data = {
          id: elem.stay,
        };
        $.ajax({
          type: "POST",
          url: "/booking/stays",
          data: data,
          complete: function (xhr) {
            let stay = JSON.parse(xhr.getResponseHeader("stay"))[0];
            let images = stay.images.split(",");
            $("#incomingtrip").after(
              `<tr><td><table class='bookingstable' id='bookingstable${i}'><tr>
              <td id='offerbox' rowspan='3'><div id='carousel${i}' class='carousel slide small-carousel' data-interval='false' data-ride='carousel'>
                <div class='carousel-inner' id='inner${i}'></div>
                <a class="carousel-control-prev" id='prev-control${i}' href="#carousel${i}" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" id='next-control${i}' href="#carousel${i}" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
                </div></td>
              <td colspan='2' id='bookingtitle'>${stay.title}</td>
              <td id='unbooklink'><a href='#' style='color: #FF0000;'>Unbook</a></td></tr>
              <tr><td>${stay.price} €/night</td>
              <td>${stay.type}</td>
              <td>${stay.size} guests</td></tr>
              <tr><td colspan='3'> ${stay.description}</td></tr></table></td></tr>`
            );

            if (images.length == 1) {
              $("#prev-control" + i).remove();
              $("#next-control" + i).remove();
            }

            $.each(images, function (index, elem) {
              let active = "";
              if (index === 0) {
                active = " active";
              }
              $("#inner" + i).append(`
              <div class='carousel-item${active}' id='small-image'>
              <img src='https://airbnbclonehousesas.s3.amazonaws.com/${elem}/>
              </div>`);
            });
          },
        });
      });
    }
  },
});

//Show user details on click
$(document).on("click", ".expand", function () {
  $(".field").addClass("expand");
  $(".modlink").text("Edit").removeClass("cancel");
  $(".preclick").show();
  $(".postclick").attr("hidden", true);
  $(this).find(".preclick").hide();
  $(this).find(".postclick").attr("hidden", false);
  $(this).find(".modlink").text("Cancel").addClass("cancel");
  $(this).removeClass("expand");
  $("input").removeClass("is-invalid");
});

$(document).on("click", ".cancel", function () {
  $(this).text("Edit").removeClass("cancel");
  $(".preclick").show();
  $(".postclick").attr("hidden", true);
  $(".field").addClass("expand");
  $("input").removeClass("is-invalid");
});

//Prevent from sending form if information isn't correct
$("input").on("input", function () {
  $(this).removeClass("is-invalid");
});

$("#name").on("input", function () {
  let input = $(this)[0];
  let inputData = $(this);
  if (input.checkValidity()) {
    $.ajax({
      type: "post",
      url: "/username-validation",
      data: inputData,
      complete: function (data) {
        if (data.responseText === "username taken") {
          $("#name").addClass("is-invalid");
          $("#invalid-username").text("Username already taken.");
        }
      },
    });
  } else {
    $("#name").addClass("is-invalid");
  }
});

//Verify email validity and change input status after user input
$("#email").on("change", function () {
  let input = $(this)[0];
  let inputData = $(this);
  if (input.checkValidity()) {
    $.ajax({
      type: "post",
      url: "/email-validation",
      data: inputData,
      complete: function (data) {
        if (data.responseText === "email taken") {
          $("#email").addClass("is-invalid");
          $("#invalid-email").text("Email already taken.");
        }
      },
    });
  } else {
    $(this).addClass("is-invalid");
  }
});

$(".modtext").on("submit", function (e) {
  e.preventDefault();
  let modtype = $(this).find("input").filter(":visible:first").attr("name");
  let data = $(this).serialize();
  data += `&type=${modtype}`;

  $(this)
    .find("input")
    .each(function () {
      if (!this.checkValidity()) {
        $(this).addClass("is-invalid");
      }
      if ($(this).val() == "") {
        $(this).addClass("is-invalid");
      }
    });

  //Submit account changes
  if ($(this).find(".is-invalid").length === 0) {
    $.ajax({
      type: "post",
      url: "/change/account/infos",
      data: data,
      success: function () {
        window.location.href = "/account";
      },
      error: function (data) {
        let errormsg = data.responseText;
        if (errormsg === "password incorrect") {
          $("#password").addClass("is-invalid");
        } else {
          alert("Oops something went wrong");
        }
      },
    });
  }
});

//Save avatar changes
$(".modav").on("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(this);
  $.ajax({
    type: "post",
    url: "/change/account/avatar",
    data: formData,
    processData: false,
    contentType: false,
    success: function () {
      window.location.href = "/account";
    },
    error: function () {
      alert("Something went wrong uploading your file");
    },
  });
});

//Delete account
$("#delete-account-btn").on("click", function () {
  window.location.href = "/change/account/remove";
});

$("#createHome").click(function () {
  window.location.href = "/stays/new";
});

let unbookingid;
//Unbook stay
$(document).on("click", "#unbooklink", function (e) {
  e.preventDefault();
  order = $(this).parents(".bookingstable")[0].id.split("table")[1];
  unbookingid = booking_ordered[order].id;
  $("#unbook-confirmation").modal();
});

$(document).on("click", "#unbook-btn", function (e) {
  e.preventDefault();
  let data = { id: unbookingid };
  $.ajax({
    type: "POST",
    url: "/stays/unbook",
    data: data,
    complete: function () {
      location.reload();
    },
  });
});
