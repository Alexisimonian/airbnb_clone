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
});
