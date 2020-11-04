$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
    }).done(function (data) {
      $("#errors").text(data);
    });
  });
});
