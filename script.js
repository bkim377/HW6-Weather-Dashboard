$(document).ready(function() {
  // ********** This .js file sets up the page's HTML elements and the search bar's history.

  // ********** Part 1: Creates the top right card and adds the city name and weather data

  var rightSide = $("#right-side");
  // Designs the top right of the page (city name, date, and weather attributes)
  var wrapper1 = $("<div>"); // Creates the container for the card
  wrapper1.addClass("container");
  var wrapper1Row1 = $("<div>"); // Creates padding for the card on the left
  wrapper1Row1.addClass("row");
  var wrapper1Card = $("<div>"); // Creates the card itself
  wrapper1Card.addClass("col-lg-8");
  wrapper1Card.addClass("card");
  // var wrapper1CardBody = $("<div>"); // Creates the card body
  // wrapper1CardBody.addClass("card-body");
  var wrapper1CityName = $("<h3>"); // Creates the card title - city name
  wrapper1CityName.addClass("card-title");
  wrapper1CityName.attr("id", "city-name");

  // wrapper1CityName.append("Testing "); // ***** Replace with retrieved city name
  wrapper1CityName.append("(" + moment().format("MM/DD/YYYY, h:mm:ss a") + ")");
  wrapper1Card.append(wrapper1CityName);

  cityWeather = ["Temperature: ", "Humidity: ", "Wind Speed: ", "UV Index: "];
  cityWeatherIDs = ["city-temp", "city-humid", "city-wind", "city-UV"];
  for (var i = 0; i < cityWeather.length; i++) {
    var cityWeatherData = $("<p>");
    cityWeatherData.addClass("card-text");
    wrapper1Card.append(cityWeatherData);
    cityWeatherData.append(cityWeather[i]);
    cityWeatherData.attr("id", cityWeatherIDs[i]);
  }
  rightSide.append(wrapper1);
  wrapper1.append(wrapper1Row1);
  wrapper1Row1.append(wrapper1Card);

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ********** Part 2: Creates the bottom-right array for the 5-day forecast

  var wrapper1Row2 = $("<div>"); // Creates the container for the card
  wrapper1Row2.addClass("row");
  // var wrapper2Row = $("<div>"); // Creates padding for the card on the left
  // wrapper2Row.addClass("row");
  for (var j = 0; j < 5; j++) {
    var row2Card = $("<div>"); // Creates the card itself
    row2Card.addClass("card mx-2 my-2");
    row2Card.attr("id", "day-" + (j + 1));
    var row2Date = $("<h4>"); // Creates the card title - city name
    row2Date.addClass("card-title");
    var futureDate = new moment().add(j + 1, "day"); // Adds the future days to each card
    row2Date.append(futureDate.format("MM/DD/YYYY"));
    row2Card.append(row2Date);
    var cityFutureTemp = $("<p>"); // Adds in the temperature and humidity lines
    cityFutureTemp.addClass("card-text");
    cityFutureTemp.attr("id", "temp-" + (j + 1));
    row2Card.append(cityFutureTemp);
    cityFutureTemp.append("Temp: ");
    var cityFutureHumid = $("<p>"); // Adds in the temperature and humidity lines
    cityFutureHumid.addClass("card-text");
    cityFutureHumid.attr("id", "humid-" + (j + 1));
    row2Card.append(cityFutureHumid);
    cityFutureHumid.append("Humidity: ");

    wrapper1Row2.append(row2Card);
  }
  wrapper1.append(wrapper1Row2);

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // ********** Part 3: Adds the search history beneath the search bar
  // Code taken from Unit 4 (Web APIs), Exercise 28, solved folder, script.js

  cityInput = $("#city-search-bar");
  cityForm = $("#city-form");
  cityList = $("#city-list");
  var APIkey = "27e7765f93be01e0b5a867f22943cd6a";

  var cities = [];

  init();

  function renderCities() {
    // Clear city element
    cityList.html("");

    // Render a new li for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var li = $("<li>");
      li.text(city);
      li.attr("data-index", i);

      var button = $("<button>");
      button.text("Search");

      li.append(button);
      cityList.append(li);
    }
  }

  function init() {
    // Get stored cities from localStorage and parse the JSON string to an object
    var storedCities = JSON.parse(localStorage.getItem("left-side"));
    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
      cities = storedCities;
    }
    // Render cities to the DOM
    renderCities();
  }

  function storeCities() {
    // Stringify and set "cities" key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // ********** Part 4: Requests data from OpenWeatherAPI when the search button is clicked
  // When form is submitted...
  cityForm.on("click", function(event) {
    event.preventDefault();
    var cityText = cityInput.val();
    // Return from function early if submitted cityText is blank
    if (cityText === "" || cityText === $("cities")) {
      return;
    }
    // Add new cityText to cities array, clear the input
    cities.push(cityText);
    cityInput.val("");
    // Store updated cities in localStorage, re-render the list
    storeCities();
    renderCities();

    // This part calls the OpenWeather API and retrieves the weather data for the searched city
    // Code taken from Unit 6, Exercise 5, solved folder, bujumbra-solved.html

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityText + "&appid=" + APIkey;
    // ++++++++++ AJAX request 1: top-right card    
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Transfer content to HTML (top-right card)
        $("#city-name").html(response.name + " (" + moment().format("MM/DD/YYYY, h:mm:ss a") + ")");
        $("#city-humid").text("Humidity: " + response.main.humidity);
        $("#city-wind").text("Wind Speed: " + response.wind.speed);
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        // add temp content to html
        $("#city-temp").text("Temperature: " + tempF.toFixed(2) + " °F");

        // ++++++++++ AJAX request 2: top-right card (UV Index)
        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
          method: "GET"
        }).then(function(response) {
          $("#city-UV").text("UV Index: " + response.value);
          if (response.value < 3) {
            $("#city-UV").addClass("favorable").removeClass("moderate high very-high severe");
          } else if (response.value >= 3 && response.value < 6) {
            $("#city-UV").addClass("moderate").removeClass("favorable high very-high severe");
          } else if (response.value >= 6 && response.value < 8) {
            $("#city-UV").addClass("high").removeClass("favorable moderate very-high severe");
          } else if (response.value >= 8 && response.value < 11) {
            $("#city-UV").addClass("very-high").removeClass("favorable moderate high severe");
          } else if (response.value > 11) {
            $("#city-UV").addClass("severe").removeClass("favorable moderate high very-high");
          }

        });
      });
  
      var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&cnt=5&appid=" + APIkey;
    $.ajax({
      url: queryURLforecast,
      method: "GET"
    }).then(function(response) {
      for (var i = 0; i < 5; i++) {
        var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;
        $("#temp-"+(i+1)).text("Temp: " + tempF.toFixed(2) + " °F");
        $("#humid-"+(i+1)).text("Humidity: " + response.list[i].main.humidity);
      }
    });
    

    });

  // When an element inside of the cityList is clicked...
  cityList.on("click", function(event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
      // *****Still need to do***** Get its data-index value and search that city again
      // var index = element.parentElement.getAttribute("data-index");
      // todos.splice(index, 1);
    }
  });
});
