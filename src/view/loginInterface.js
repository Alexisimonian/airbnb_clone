let data = {};
data.title = "title";
data.message = "message";
$.ajax({
  type: "POST",
  data: JSON.stringify(data),
  contentType: "application/json",
  url: "http://localhost:3000/login",
  success: function (data) {
    console.log(JSON.stringify(data));
  },
});
