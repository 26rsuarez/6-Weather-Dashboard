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
  // call the api for the single day weather
  var api = "515798d11075abbf042d6d0ba0edef46";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api;
  $.ajax({
      url: queryUrl,
      type: "Get"
    }).then(function(response){
      console.log(response);
      // this variables will be displayed on the html
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      // lat and lon are neeeded to call for uv index
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      
      $("#nameofcity").text(cityname);
      $("#temperature").text("Temperature: "+temperature);
      $("#humidity").text("Humidity: "+humidity+"%");
      $("#windspeed").text("Wind Speed: "+windSpeed+" MPH");
      
      //this will give the uv index of the location through the api
      uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+api;
      $.ajax({
        url: uvIndexURL,
        type: "Get"
      }).then(function(response){
        console.log(response);
        //the uv index will be displayed on the page
        var uvIndex = response.value;
        $("#uvindex").text("UV Index: "+uvIndex);
      })
    })
  
}

// this api will display the 5day forecast
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