$(document).ready(function () {
  $("#register-form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/register",
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
