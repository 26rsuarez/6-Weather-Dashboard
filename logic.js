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
      a.addClass("city-btn btn btn-outline-secondary btn-block");
      // Adding a data-attribute
      a.attr("data-name", cityArr[i]);
      // Providing the text
      a.text(cityArr[i]);
      // Adding the button to the buttons-area div
      $("#buttons-area").append(a);
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
      var temperatureF = (temperature-273.15)*9/5+32;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed*2.2;
      var iconTag = $("<img>").attr("src","https://openweathermap.org/img/wn/" +response.weather[0].icon+ "@2x.png");
      // lat and lon are neeeded to call for uv index
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var dateNeeded = new Date();
      var day = dateNeeded.getDate();
      var month = dateNeeded.getMonth();
      var year = dateNeeded.getFullYear();
      
      $("#nameofcity").text(cityname+"("+month+"/"+day+"/"+year+")");
      $("#nameofcity").append(iconTag);
      $("#temperature").text("Temperature: "+temperatureF.toFixed(1)+"°F");
      $("#humidity").text("Humidity: "+humidity+"%");
      $("#windspeed").text("Wind Speed: "+windSpeed.toFixed(1)+" MPH");
      
      //this will give the uv index of the location through the api
      uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+api;
      $.ajax({
        url: uvIndexURL,
        type: "Get"
      }).then(function(response){
        
        //the uv index will be displayed on the page
        var uvIndex = response.value;
        $("#uvindex").text("UV index: ");
        console.log(uvIndex);
        //the uv will be color coded green, yellow, or red depending on how severe it is
        if (uvIndex<3) {
          var uvValue = $("<span>").attr("class", "badge badge-success").text(uvIndex);
          $("#uvindex").append(uvValue);
        }
        else if (uvIndex>=3 && uvIndex<6) {
          var uvValue = $("<span>").attr("class", "badge badge-warning").text(uvIndex);
          $("#uvindex").append(uvValue);
        }
        else {
          var uvValue = $("<span>").attr("class", "badge badge-danger").text(uvIndex);
          $("#uvindex").append(uvValue);
        }
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
        $("#5daytitle").text("5-Day Forecast:");
        

        // the object returned has 40 arrays with the day changing every 8 arrays
        for (var i=0; i<40; i+=8) {
          //clear the div text first
          var divId = "#Forecast" + i;
          $(divId).empty();
          //the date is in the object but it needs to be parsed
          var defaultDate = response.list[i].dt_txt;
          var dateNeeded = defaultDate.split(" ");
          var dateParsed = dateNeeded[0].split("-");
          var year = dateParsed[0];
          var month = dateParsed[1];
          var day = dateParsed[2];

          //other variables needed from the object
          var temperatureK = response.list[i].main.temp;
          var temperatureF = (temperatureK-273.15)*9/5+32;
          var hum = response.list[i].main.humidity;

          // then the important properties are added to the html
          var date = $("<p>").text(+month+"/"+day+"/"+year);
          //the icon can be obtained from the object and the website
          var icon = $("<img>").attr("src","https://openweathermap.org/img/wn/" +response.list[i].weather[0].icon+ "@2x.png");

          var temp = $("<p>").text("Temp: "+temperatureF.toFixed(1)+"°F");
          var humidity = $("<p>").text("Humidity: "+hum+"%");
          $(divId).append(date,icon,temp,humidity);
        }
      })
}

//event listener for buttons already created
$(document).on("click", ".city-btn", function() {
    var cityname = $(this).attr("data-name");
    showWeather(cityname);
    fiveDayForecast(cityname);
});