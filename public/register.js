$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
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
        $("#errors").text(data.responseText);
      },
    });
  });
});
