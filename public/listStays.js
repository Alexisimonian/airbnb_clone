$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/stays",
    complete: function (xhr) {
      let logbtn = xhr.getResponseHeader("logbtn");
      $("#logbtn").html(`<a href='/${logbtn}'>${logbtn}</a>`);
      let homesList = xhr.getResponseHeader("listing");
      jQuery.each(homesList, function (index, value) {
        alert(value);
      });
    },
  });
  $("#createHome").click(function (e) {
    $.ajax({
      type: "get",
      url: "/stays",
      complete: function (xhr) {
        if (xhr.getResponseHeader("logbtn") == "logout") {
          window.location.href = "http://localhost:3000/stays/new";
        } else {
          $("#warning").text("you must login to continue");
        }
      },
    });
  });
});
