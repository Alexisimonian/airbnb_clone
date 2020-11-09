$(document).ready(function () {
  let imagesPreview = function (input, placeToPreview) {
    if (input.files) {
      let filesAmount = input.files.length;
      for (i = 0; i > filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = function (event) {
          $($.parseHTML("<img>"))
            .attr("src", event.target.result)
            .appendTo(placeToPreview);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };
  $("#imageFiles").on("change", function () {
    imagesPreview(this, ".preview-images");
  });
  $("#newStayForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/upload",
      success: function () {
        window.location.href = "http://localhost:3000/stays";
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  });
});
