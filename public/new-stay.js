$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid");
});

$("#available_from, #available_to").on("click", function () {
  $(this).removeClass("is-invalid");
});

// Autocomplete setup
let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  country: "long_name",
  postal_code: "short_name",
};

function resetAutoComplete() {
  for (const component in componentForm) {
    document.getElementById(component).value = "";
  }
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
}

$("#autocomplete").on("change", function () {
  resetAutoComplete();
});

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    { types: ["geocode"] }
  );

  autocomplete.setFields(["address_component", "geometry"]);
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  resetAutoComplete();

  for (const component of place.address_components) {
    const addressType = component.types[0];
    if (componentForm[addressType]) {
      const val = component[componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
  document.getElementById("latitude").value = place.geometry.location.lat();
  document.getElementById("longitude").value = place.geometry.location.lng();
}

//Date restrictions
let now = new Date();
let day = String(now.getDate()).padStart(2, "0");
let month = String(now.getMonth() + 1).padStart(2, "0");
let year = now.getFullYear();
let today = year + "-" + month + "-" + day;

$.datepicker.setDefaults({
  minDate: today,
  dateFormat: "yy-mm-dd",
});

$("#available_from").datepicker({
  onSelect: function (date, inst) {
    let date_obj = $.datepicker.parseDate("yy-mm-dd", date);
    $("#available_to").datepicker("option", "minDate", date_obj);
  },
});

$("#available_to").datepicker({
  onSelect: function (date, inst) {
    let date_obj = $.datepicker.parseDate("yy-mm-dd", date);
    $("#available_from").datepicker("option", "maxDate", date_obj);
  },
});

// Preview place photos before uploading
let fileCollection = new Array();

$("#image-files").on("change", function (e) {
  $(this).removeClass("is-invalid");
  let files = e.target.files;
  $.each(files, function (i, file) {
    if (fileCollection.length < 5) {
      fileCollection.push(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        let template = `<span class='pip'>
          <img id='image' src='${e.target.result}' width='90px'>
          <button class='btn btn-light remove'><span class='fa fa-times'></span></button>
        </span>`;

        $("#preview-images").append(template);

        $(".remove").on("click", function () {
          fileCollection = jQuery.grep(fileCollection, function (value) {
            return value != file;
          });
          $(this).parent(".pip").remove();
          $("#errors").text("");
        });
      };
    } else {
      $("#errors").text("You cannot upload more than 5 images");
    }
  });
});

//Verify form information and submit
$("#new-stay-form").on("submit", function (e) {
  e.preventDefault();
  let form = $(this)[0];
  let formData = new FormData(form);
  formData.append("available_from", $("#available_from").val());
  formData.append("available_to", $("#available_to").val());

  $(":input").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("is-invalid");
    }
  });

  if ($(".field").val() == "") {
    $("#autocomplete").addClass("is-invalid");
  }

  if (fileCollection.length == 0) {
    $("#image-files").addClass("is-invalid");
  }

  $(".btn").removeClass("is-invalid");

  if (document.getElementsByClassName("is-invalid").length == 0) {
    $.each(fileCollection, function (i, image) {
      formData.append("files", fileCollection[i]);
    });

    $.ajax({
      type: "post",
      url: "/stays/new",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        window.location.href = "http://localhost:3000/stays";
      },
      error: function (data) {
        $("#errors").text(data.responseText);
      },
    });
  }
});
