$(document).ready(function () {
  $("#login-form").on("change", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/verifying-login",
      data: data,
      dataType: "text",
      complete: function (data) {
        console.log(data);
      },
    });
  });

  $("#login-form").on("submit", function (e) {
    e.preventDefault();
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
        $("#errors").html(
          "<div class='alert alert-danger' role='alert'>" +
            data.responseText +
            "</div>"
        );
      },
    });
  });
});
