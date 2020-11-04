$(document).ready(function () {
  alert("hello");
  $("form#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
    }).done(function (data) {
      console.log(data);
    });
  });
});
