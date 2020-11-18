$(document).ready(function () {
  let correct_username = false;
  let correct_email = false;
  let secured_password = false;
  let password_confirmation = false;

  //Make box status neutral on user modification
  $(".form-control").on("input", function () {
    $(this).removeClass("is-valid is-invalid");
  });

  //Verify username validity and change input status after user input
  $("#username").on("input", function () {
    let input = $(this)[0];
    let inputData = $(this);
    if (input.checkValidity()) {
      $.ajax({
        type: "post",
        url: "/username-validation",
        data: inputData,
        complete: function (data) {
          if (data.responseText === "username free") {
            correct_username = true;
            $("#username").addClass("is-valid");
          } else {
            correct_username = false;
            $("#username").addClass("is-invalid");
            $("#invalid-username").text("Username already taken.");
          }
        },
      });
    } else {
      correct_username = false;
      $("#username").addClass("is-invalid");
    }
  });

  //Verify email validity and change input status after user input
  $("#email_input").on("change", function () {
    let input = $(this)[0];
    let inputData = $(this);
    if (input.checkValidity()) {
      $.ajax({
        type: "post",
        url: "/email-validation",
        data: inputData,
        complete: function (data) {
          if (data.responseText === "email free") {
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
    }
  });

  //Verify password validity and change input status after user input
  $("#password_input").on("change", function () {
    let input = $(this)[0];
    if (input.checkValidity()) {
      secured_password = true;
      $(this).addClass("is-valid");
    } else {
      secured_password = false;
      $(this).addClass("is-invalid");
    }
  });

  //Verify matching passwords on input on either one of the 2 passwords boxes
  $(".psw").on("input", function () {
    $("#password_confirm").removeClass("is-valid is-invalid");
    if ($("#password_confirm").val() != "") {
      if ($("#password_input").val() != $("#password_confirm").val()) {
        password_confirm = false;
        $("#password_confirm").addClass("is-invalid");
      } else {
        password_confirm = true;
        $("#password_confirm").addClass("is-valid");
      }
    }
  });

  //Verify all boxes filled w/ correct information and redirect registered user
  $("#register-form").submit(function (e) {
    e.preventDefault();
    let formData = $(this).serialize();
    let is_valid =
      correct_username &&
      correct_email &&
      secured_password &&
      password_confirmation;
    if (!is_valid) {
      $(":input").each(function () {
        if ($(this).val() == "") {
          $(this).addClass("is-invalid");
        }
      });
    } else {
      $.ajax({
        type: "post",
        url: "/register",
        data: formData,
        success: function () {
          window.location.href = "http://localhost:3000/";
        },
      });
    }
  });
});
