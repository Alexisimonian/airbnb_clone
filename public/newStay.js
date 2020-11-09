$(document).ready(function () {
  $("#newStayForm").on("submit", function (e) {
    $.ajax({
      type: "post",
      url: "/newstay",
      success: function () {
        window.location.href = "http://localhost:3000/stays";
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  });
});
