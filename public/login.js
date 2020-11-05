$(document).ready(function () {
  $("#loginForm").on("submit", function (ev) {
    ev.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
      success: function () {
        ev.target.submit();
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  });
});
