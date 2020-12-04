$.ajax({
  type: "GET",
  url: "/account",
  complete: function (xhr) {
    let username = xhr.getResponseHeader("username");
    $("#account_header").text(`Hi, I'm ${username}`);
  },
});
