//array to hold the cities
var cityArr = [];

//event listener to get city from search bar and render information
$("#searchbtn").on("click", function(event){
    event.preventDefault();
    var city = $("#searchtext").val().trim();
    cityArr.push(city);
    renderButtons();
    showWeather(city);
    fiveDayForecast(city);

})

//function for displaying the city buttons
function renderButtons() {

    // clearing city button before creating new ones
    $("#buttons-area").empty();

    // Looping through the array of movies
    for (var i = 0; i < cityArr.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      var a = $("<button>");
      a.addClass("city-btn");
      // Adding a data-attribute
      a.attr("data-name", cityArr[i]);
      // Providing the text
      a.text(cityArr[i]);
      // Adding the button to the buttons-area div
      $("#buttons-area").append(a);
      $("#buttons-area").append($("<br>"));

    }
  }

//function for showing the weather information on the page
function showWeather(cityname) {
  var api = "515798d11075abbf042d6d0ba0edef46";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api;
  var lat;
  var lon;
  $.ajax({
      url: queryUrl,
      type: "Get"
    }).then(function(response){
      console.log(response);
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      lat = response.coord.lat;
      lon = response.coord.lon;
      // var uvIndex = response.data[0].value;
      $("#nameofcity").text(cityname);
      $("#temperature").text(temperature);
      $("#humidity").text(humidity);
      $("#windspeed").text(windSpeed);
      // $("#uvindex").text(uvIndex);
    })
  url = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+api;
  $.ajax({
    url: uvIndexURL,
    type: "Get"
  }).then(function(response){
    console.log(response);
  })
}

function fiveDayForecast(cityname) {
    var api = "515798d11075abbf042d6d0ba0edef46";
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+api;
    $.ajax({
        url: queryUrl,
        type: "Get"
      }).then(function(response){
        console.log(response);
        // for (var i=0; i<40; i+=8) {

        // }
      })
}

//event listener for buttons already created
$(document).on("click", ".city-btn", function() {
    var cityname = $(this).attr("data-name");
    showWeather(cityname);
    fiveDayForecast(cityname);
});