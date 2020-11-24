//Pages's buttons and personalised messages
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

//Date picker in search module
let date_1;
let date_2;

function setDates() {
  date_1 = $.datepicker.parseDate("mm/dd/yy", $("#check_in").val());
  date_2 = $.datepicker.parseDate("mm/dd/yy", $("#check_out").val());
}

$(".forward").datepicker({
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

  onSelect: function (date, inst) {
    setDates();
    if (!date_1) {
      $("#check_in").val(date);
    } else if (date_1 && !date_2) {
      $("#check_out").val(date);
    } else if (date_1 && date_2) {
      if (date <= $("#check_in").val()) {
        $("#check_in").val(date);
      }
      if (date >= $("#check_in").val()) {
        $("#check_out").val(date);
      }
    }
  },
});

$(".backward").datepicker({
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

  onSelect: function (date, inst) {
    setDates();
    if (!date_1) {
      $("#check_in").val(date);
    } else if (date_1 && !date_2) {
      $("#check_out").val(date);
    } else if (date_1 && date_2) {
      if (date <= $("#check_in").val()) {
        $("#check_in").val(date);
      }
      if (date >= $("#check_in").val()) {
        $("#check_out").val(date);
      }
    }
  },
});

$(".datepicker").hide();

$("#check_in").click(function () {
  if ($(".backward").is(":visible")) {
    $(".backward").hide();
    $(".forward").show();
  } else if ($(".forward").is(":visible")) {
    $(".forward").hide();
  } else {
    $(".forward").show();
  }
});

$("#check_out").click(function () {
  if ($(".forward").is(":visible")) {
    $(".forward").hide();
    $(".backward").show();
  } else if ($(".backward").is(":visible")) {
    $(".backward").hide();
  } else {
    $(".backward").show();
  }
});

// Close date picker when click elsewhere
$(document).on("click", function (e) {
  var element = $(e.target);
  if (
    !element.hasClass("search_dates") &&
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
