//Pages's buttons and personalised messages
$.ajax({
  type: "get",
  url: "/",
  complete: function (xhr) {
    let welcomeMsg = xhr.getResponseHeader("welcomeMsg");
    let logbtn = xhr.getResponseHeader("logbtn");
    $("#welcome_msg").text(welcomeMsg);
    $("#logbtn").html(`<a href='/${logbtn}'>${logbtn}</a>`);
  },
});

//Date picker in search module
let date_1;
let date_2;

function setDates() {
  date_1 = $.datepicker.parseDate("yy-mm-dd", $("#check_in").val());
  date_2 = $.datepicker.parseDate("yy-mm-dd", $("#check_out").val());
}

function refreshDates() {
  $(".datepicker").datepicker("refresh");
}

let now = new Date();
let day = String(now.getDate()).padStart(2, "0");
let month = String(now.getMonth() + 1).padStart(2, "0");
let year = now.getFullYear();
let today = year + "-" + month + "-" + day;

$.datepicker.setDefaults({
  minDate: today,
  dateFormat: "yy-mm-dd",
  numberOfMonths: 2,
  beforeShow: function (input, inst) {
    setTimeout(() => {
      inst.dpDiv.css({
        top: 150,
        left: 0,
      });
    }, 0);
  },
  beforeShowDay: function (date) {
    setDates();
    if (date_1 && date.getTime() == date_1.getTime()) {
      return [true, "ui-state-highlight"];
    } else if (date_2 && date >= date_1 && date <= date_2) {
      return [true, "ui-state-highlight"];
    }
    return [true, ""];
  },
});

$(".check_in").datepicker({
  onSelect: function (date, inst) {
    $("#check_in").val(date);
    refreshDates();
    if (!date_2) {
      $(this).hide();
      $("#check_out").click();
    }
  },
});

$(".check_out").datepicker({
  onSelect: function (date, inst) {
    $("#check_out").val(date);
    refreshDates();
    if (!date_1) {
      $(this).hide();
      $("#check_in").click();
    }
  },
});

//Which datepicker shows up
$(".datepicker").hide();

$("#check_in").click(function () {
  if ($(".check_out").is(":visible")) {
    $(".check_out").hide();
    $(".check_in").show();
  } else if ($(".check_in").is(":visible")) {
    $(".check_in").hide();
  } else {
    $(".check_in").show();
  }
});

$("#check_out").click(function () {
  if ($(".check_in").is(":visible")) {
    $(".check_in").hide();
    $(".check_out").show();
  } else if ($(".check_out").is(":visible")) {
    $(".check_out").hide();
  } else {
    $(".check_out").show();
  }
});

// Close datepickers when click elsewhere
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

$(".ui-state-default").on("mouseover", function () {
  let day = $(this).text();
  let month = $(this).parents("td").attr("data-month");
  let year = $(this).parents("td").attr("data-year");
  if (date_1) {
  }
});
