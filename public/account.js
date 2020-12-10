$.ajax({
  type: "GET",
  url: "/account",
  complete: function (xhr) {
    let username = xhr.getResponseHeader("username");
    let logbtn = xhr.getResponseHeader("logbtn");
    $("#account_header").text(`Hi, I'm ${username}`);
    $("#logbtn").text(`${logbtn}`);
    $("#logbtn").attr("href", `/${logbtn}`);
    if (logbtn == "login") {
      $("#logbtn").after(
        "<a class='dropdown-item' href='/register'> Sign up </a>"
      );
    } else {
      $("#logbtn").after(
        "<div class='dropdown-divider'></div><a class='dropdown-item' href='/account'> Account </a>"
      );
    }
  },
});

$.ajax({
  type: "get",
  url: "/",
  complete: function (xhr) {},
});
