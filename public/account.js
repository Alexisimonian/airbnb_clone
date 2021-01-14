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
      `<img src='/avatars/${user.avatar}' width='90' height='90'>`
    );

    //Bookings information
    if (bookings.length == 0) {
      $("#incomingtrip, #previoustrip").each(function () {
        $(this).after(
          "<tr class='field'><td>Nothing to show. Book your next holidays !</td></tr>"
        );
      });
    } else {
      let now = new Date();
      now = Date.parse(now);
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
        window.location.href = "http://localhost:3000/account";
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
      window.location.href = "http://localhost:3000/account";
    },
    error: function () {
      alert("Something went wrong uploading your file");
    },
  });
});

//Delete account
$("#delete-account-btn").on("click", function () {
  window.location.href = "http://localhost:3000/change/account/remove";
});
