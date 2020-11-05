$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/stays",
    complete: function (xhr) {
      let data = xhr.getResponseHeader("listing");
      jQuery.each(data, function (index, value) {});
    },
  });
  $("#createHome").on("click", function (ev) {
    ev.preventDefault();
    $.ajax({
      type: "get",
      url: "/stays/new",
      success: function () {
        $(this).trigger(ev.type);
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  });
});
