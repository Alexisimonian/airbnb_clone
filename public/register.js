$(document).ready(function () {
  let correct_username = false;
  let correct_email = false;
  let secured_password = false;
  let password_confirmation = false;

  $("#email_input").on("input", function () {
    $(this).removeClass("is-valid is-invalid");
    let input = $(this)[0];
    let data = $(this);
    if (input.checkValidity()) {
      $.ajax({
        type: "post",
        url: "/email-validation",
        data: data,
        complete: function (data) {
          if (data.responseText === "ok") {
            correct_email = true;
            $("#email_input").addClass("is-valid");
          } else {
            correct_email = false;
            $("#email_input").addClass("is-invalid");
            $("#email-invalid").text("Email already taken.");
          }
        },
      });
    } else {
      correct_email = false;
      $(this).addClass("is-invalid");
      $("#email-invalid").text("Must be a valid email address.");
    }
  });

  $("#password_input").on("input", function () {
    $(this).removeClass("is-valid is-invalid");
    let input = $(this)[0];
    if (input.checkValidity()) {
      secured_password = true;
      $(this).addClass("is-valid");
    } else {
      secured_password = false;
      $(this).addClass("is-invalid");
    }
  });

  $(".psw").on("input", function () {
    $("#password_confirm").removeClass("is-valid is-invalid");
    if ($("#password_confirm").val() != "") {
      if ($("#password_input").val() != $("#password_confirm").val()) {
        $("#password_confirm").addClass("is-invalid");
        password_confirm = false;
      } else {
        $("#password_confirm").addClass("is-valid");
        password_confirm = true;
      }
    }
  });

  $("#register-form").submit(function (e) {
    e.preventDefault();
    let form = $(this)[0];
    let formData = $(this).serialize();
    let is_valid =
      correct_username &&
      correct_email &&
      secured_password &&
      password_confirmation;
    if (!is_valid) {
      e.stopPropagation();
    }
    $.ajax({
      type: "post",
      url: "/register",
      data: formData,
      success: function () {
        window.location.href = "http://localhost:3000/";
      },
      error: function (data) {
        console.log(data);
      },
    });
  });
});
