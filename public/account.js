$.ajax({
  type: "GET",
  url: "/account",
  complete: function (xhr) {
    let email = xhr.getResponseHeader("email");
    let username = xhr.getResponseHeader("username");
    let logbtn = xhr.getResponseHeader("logbtn");
    $("#account_header").text(`Hi, I'm ${username}`);
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
  },
});

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

$("input").on("input", function () {
  $(this).removeClass("is-invalid");
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

$("#delete-account-btn").on("click", function () {
  window.location.href = "http://localhost:3000/change/account/remove";
});
