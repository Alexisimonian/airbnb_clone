$(document).ready(function () {
  let fileCollection = new Array();
  $("#imageFiles").on("change", function (e) {
    let files = e.target.files;
    $.each(files, function (i, file) {
      fileCollection.push(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        let template = '<img src="' + e.target.result + '">';
        $("#preview-images").append(template);
      };
    });
  });
  $("#newStayForm").on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    $.each(fileCollection, function (i, image) {
      formData.append("files", fileCollection[i]);
    });
    $.ajax({
      url: "/upload",
      type: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        window.location.href = "http://localhost:3000/stays";
      },
      error: function (xhr) {
        $("#errors").text(xhr.responseText);
      },
    });
  });
});
