//Make box status neutral on user modification
$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid");
});

//Verify username validity and change input status after user input
$("#username").on("input", function () {
  $("#invalid-username").text("Username must be 4 characters or more.");
  let input = $(this)[0];
  let inputData = $(this);
  if (input.checkValidity()) {
    $.ajax({
      type: "post",
      url: "/username-validation",
      data: inputData,
      complete: function (data) {
        if (data.responseText === "username taken") {
          $("#username").addClass("is-invalid");
          $("#invalid-username").text("Username already taken.");
        }
      },
    });
  } else {
    $("#username").addClass("is-invalid");
  }
});

//Verify email validity and change input status after user input
$("#email_input").on("change", function () {
  $("#email-invalid").text("Must be a valid email address.");
  let input = $(this)[0];
  let inputData = $(this);
  if (input.checkValidity()) {
    $.ajax({
      type: "post",
      url: "/email-validation",
      data: inputData,
      complete: function (data) {
        if (data.responseText === "email taken") {
          $("#email_input").addClass("is-invalid");
          $("#email-invalid").text("Email already taken.");
        }
      },
    });
  } else {
    $(this).addClass("is-invalid");
  }
});

//Verify password validity and change input status after user input
$("#password_input").on("change", function () {
  let input = $(this)[0];
  if (!input.checkValidity()) {
    $(this).addClass("is-invalid");
  }
});

//Verify matching passwords on input on either one of the 2 passwords boxes
$(".psw").on("input", function () {
  $("#password_confirm").removeClass("is-invalid");
  if ($("#password_confirm").val() != "") {
    if ($("#password_input").val() != $("#password_confirm").val()) {
      $("#password_confirm").addClass("is-invalid");
    }
  }
});

//Verify all boxes filled w/ correct information and redirect registered user
$("#register-form").submit(function (e) {
  e.preventDefault();
  let formData = $(this).serialize();

  $(":input").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("is-invalid");
    }
  });

  if ($(this).find(".is-invalid").length === 1) {
    $.ajax({
      type: "post",
      url: "/register",
      data: formData,
      success: function () {
        window.location.href = "/";
      },
    });
  }
});
