$(document).ready(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
      success: function (data) {
        e.target.submit();
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  });
});
