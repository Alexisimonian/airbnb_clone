//Set number of guests in search
$(".guest_value").on("click", function () {
  $("#nb_selected").text($(this).text() + " guests");
  document.getElementById("guests").value = $(this).text();
});

//Complete location even if clicked on frame button
$("#location_button").on("click", function () {
  $("#location").focus();
});

$("#submit").click(function () {
  if ($("#country").val() === "") {
    $("#location").focus();
  } else {
    $("#search_stay").submit();
  }
});

//Determines if connected
$.ajax({
  type: "get",
  url: "/",
  complete: function (xhr) {
    let logbtn = xhr.getResponseHeader("logbtn");
    $("#logbtn").text(`${logbtn}`);
    if (logbtn == "login") {
      $("#logbtn").attr("href", "#");
      $("#logbtn").attr("data-toggle", "modal");
      $("#logbtn").attr("data-target", "#logmodal");
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").attr("href", "/logout");
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }
  },
});

//Login implementation
$("#login").click(function () {
  $("#login-form").submit();
});

$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid");
});

//Submit form
$("#login-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $(":input").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("is-invalid");
    }
  });

  if ($(this).find(".is-invalid").length == 0) {
    $.ajax({
      type: "post",
      url: "/login",
      data: data,
      dataType: "text",
      success: function () {
        alert("Successfully connected !");
        window.location.href = "/";
      },
      error: function (data) {
        if (data.responseText == "email incorrect") {
          $("#email_input").addClass("is-invalid");
          $("#invalid-email").text("No account with this email address.");
        } else if (data.responseText == "password incorrect") {
          $("#password_input").addClass("is-invalid");
          $("#invalid-password").text("Password incorrect.");
        }
      },
    });
  }
});

//Autocomplete setup
let placeSearch;
let autocomplete;
const componentForm = {
  locality: "long_name",
  country: "long_name",
};

function resetAutoComplete() {
  for (const component in componentForm) {
    document.getElementById(component).value = "";
  }
}

$("#location").on("change", function () {
  resetAutoComplete();
});

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("location"),
    {
      types: ["geocode"],
    }
  );
  autocomplete.setFields(["address_component"]);
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
}

//Wipe dates values on refresh
$(window).on("load", function () {
  $("#check_in").val("");
  $("#check_out").val("");
  refreshDates();
});

//Date picker in search module
let now = new Date();
let day = String(now.getDate()).padStart(2, "0");
let month = String(now.getMonth() + 1).padStart(2, "0");
let year = now.getFullYear();
let today = year + "-" + month + "-" + day;

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date_1;
let date_2;

function shortDate(date) {
  if (date) {
    return date.getDate() + " " + months[date.getMonth()];
  } else {
    return "Add dates";
  }
}

function setDates() {
  date_1 = $.datepicker.parseDate("yy-mm-dd", $("#check_in").val());
  date_2 = $.datepicker.parseDate("yy-mm-dd", $("#check_out").val());
  $("#check_in_short_date").text(shortDate(date_1));
  $("#check_out_short_date").text(shortDate(date_2));
}

function refreshDates() {
  setDates();
  $(".datepicker").datepicker("refresh");
}

$.datepicker.setDefaults({
  minDate: today,
  dateFormat: "yy-mm-dd",
  numberOfMonths: 2,
  beforeShowDay: function (date) {
    if (date_1 && date.getTime() == date_1.getTime()) {
      return [true, "dp-select"];
    } else if (date_2 && date.getTime() == date_2.getTime()) {
      return [true, "dp-select"];
    } else if (date_1 && date_2 && date > date_1 && date < date_2) {
      return [true, "dp-highlight"];
    }
    return [true, ""];
  },
});

$(".check_in").datepicker({
  onSelect: function (date, inst) {
    if (date_2 && date > $("#check_out").val()) {
      $("#check_out").val("");
    }
    $("#check_in").val(date);
    refreshDates();
    $(this).hide();
    $("#btn_check_out").click();
  },
});

$(".check_out").datepicker({
  onSelect: function (date, inst) {
    if (date_1 && date < $("#check_in").val()) {
      $("#check_in").val(date);
      $("#check_out").val("");
    } else {
      $("#check_out").val(date);
    }
    refreshDates();
    if (!date_1) {
      $(this).hide();
      $("#btn_check_in").click();
    }
  },
});

//Which datepicker shows up
$(".datepicker").hide();

$("#btn_check_in").click(function () {
  if ($(".check_out").is(":visible")) {
    $(".check_out").hide();
    $(".check_in").show();
  } else if ($(".check_in").is(":visible")) {
    $(".check_in").hide();
  } else {
    $(".check_in").show();
  }
});

$("#btn_check_out").click(function () {
  if ($(".check_in").is(":visible")) {
    $(".check_in").hide();
    $(".check_out").show();
  } else if ($(".check_out").is(":visible")) {
    $(".check_out").hide();
  } else {
    $(".check_out").show();
  }
});

//Highlight dates that would be inside selection
$(document).on("mouseover", ".ui-state-default", function () {
  //Determine hovered date
  let hovered_day = parseInt($(this).text());
  let hovered_month = parseInt($(this).parents("td").attr("data-month")) + 1;
  let hovered_year = parseInt($(this).parents("td").attr("data-year"));
  let hovered_date = hovered_year + "-" + hovered_month + "-" + hovered_day;
  hovered_date = $.datepicker.parseDate("yy-mm-dd", hovered_date);

  //Highlight dates between hovered date and check_in or check_out date
  $("a.ui-state-default").each(function () {
    let date_object = this;
    let day = parseInt($(date_object).text());
    let month = parseInt($(date_object).parents("td").attr("data-month")) + 1;
    let year = parseInt($(date_object).parents("td").attr("data-year"));
    let full_date = year + "-" + month + "-" + day;
    full_date = $.datepicker.parseDate("yy-mm-dd", full_date);

    // If no date_2 highlight forward
    if (date_1 && !date_2) {
      if (full_date < hovered_date && full_date > date_1) {
        $(date_object).removeClass("dp-select");
        $(date_object).addClass("dp-highlight");
      } else if (
        full_date > date_1 &&
        full_date.getTime() == hovered_date.getTime()
      ) {
        $(date_object).removeClass("dp-highlight");
        $(date_object).addClass("dp-select");
      } else {
        $(date_object).removeClass("dp-select");
        $(date_object).removeClass("dp-highlight");
      }
    }
    // If no date_1 highlight backward
    if (date_2 && !date_1) {
      if (full_date > hovered_date && full_date < date_2) {
        $(date_object).removeClass("dp-select");
        $(date_object).addClass("dp-highlight");
      } else if (
        full_date < date_2 &&
        full_date.getTime() == hovered_date.getTime()
      ) {
        $(date_object).removeClass("dp-highlight");
        $(date_object).addClass("dp-select");
      } else {
        $(date_object).removeClass("dp-select");
        $(date_object).removeClass("dp-highlight");
      }
    }
  });
});

//Close datepickers when click elsewhere
$(document).on("click", function (e) {
  var element = $(e.target);
  if (
    !element.hasClass("dates") &&
    !element.hasClass("ui-datepicker") &&
    !element.hasClass("ui-icon") &&
    !element.hasClass("ui-datepicker-next") &&
    !element.hasClass("ui-datepicker-prev") &&
    !$(element).parents(".ui-datepicker").length
  ) {
    if ($(".hasDatepicker").is(":visible")) {
      $(".datepicker").hide();
    }
  }
});

$("#guest_select").on("click", function () {
  $(".datepicker").hide();
});

//Become host btn only available to loggedin users
$("#becomehostbtn").click(function (e) {
  e.preventDefault();
  if ($("#logbtn").text() == "login") {
    $("#logmodal").modal();
  } else {
    window.location.href = "/stays/new";
  }
});
