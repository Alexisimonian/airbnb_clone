$(document).ready(function () {
  $(".form-control").on("input", function () {
    $(this).removeClass("is-valid is-invalid");
  });

  $("#login-form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $(":input").each(function () {
      if ($(this).val() == "") {
        $(this).addClass("is-invalid");
      }
    });
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
  });
});
