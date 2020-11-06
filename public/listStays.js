$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/stays",
    complete: function (xhr) {
      let data = xhr.getResponseHeader("listing");
      jQuery.each(data, function (index, value) {
        alert(value);
      });
    },
  });
});
