$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/",
    complete: function (xhr) {
      let welcomeMsg = xhr.getResponseHeader("welcomeMsg");
      let logbtn = xhr.getResponseHeader("logbtn");
      $("#welcomeMsg").text(welcomeMsg);
      $("#logbtn").html(`<a href='/${logbtn}'>${logbtn}</a>`);
    },
  });

  $("input[name='daterange']").daterangepicker();
});
