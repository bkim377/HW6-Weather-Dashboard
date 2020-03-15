$(document).ready(function() {
    // ********** Part 1: Creates the top right card and adds the city name and weather data
    var mainBody = $("#right-side");
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
    var wrapper1CityName = $("<h4>"); // Creates the card title - city name
    wrapper1CityName.addClass("card-title");
    wrapper1CityName.append("Testing "); // ***** Replace with retrieved city name
    wrapper1CityName.append("(" + moment().format("MM/DD/YYYY, h:mm:ss a") + ")");
    wrapper1Card.append(wrapper1CityName);
    
    cityWeather = ["Temperature: ", "Humidity: ", "Wind Speed: ", "UV Index: "];
    for (var i = 0; i < cityWeather.length; i++){
        var cityWeatherData = $("<p>");
        cityWeatherData.addClass("card-text");
        wrapper1Card.append(cityWeatherData);
        cityWeatherData.append(cityWeather[i]);
    }
    mainBody.append(wrapper1);
    wrapper1.append(wrapper1Row1);
    wrapper1.append(wrapper1Card);
    
    // wrapper1CardBody.append(cityWeatherData);

    // var wrapper1CityTemp = $("<p>");  // Creates the card line - temperature
    // wrapper1CityTemp.addClass("card-text");
    // var wrapper1CityHumid = $("<p>"); // Creates the card line - humidity
    // wrapper1CityHumid.addClass("card-text");
    // var wrapper1CityWind = $("<p>"); // Creates the card line - wind speed
    // wrapper1CityWind.addClass("card-text");

    // ********** Part 2: Creates the bottom-right array for the 5-day forecast
   
    var wrapper1Row2 = $("<div>"); // Creates the container for the card
    wrapper1Row2.addClass("row");
    // var wrapper2Row = $("<div>"); // Creates padding for the card on the left
    // wrapper2Row.addClass("row"); 
    for (var j = 0; j < 5; j++){
    var row2Card = $("<div>"); // Creates the card itself
    row2Card.addClass("card mx-2 my-2");
    row2Card.attr("id", "day-" + (j+1));
    var row2Date = $("<h4>"); // Creates the card title - city name
    row2Date.addClass("card-title");
    var futureDate = new moment().add(j+1, 'day'); // Adds the future days to each card
    row2Date.append(futureDate.format("MM/DD/YYYY"));
    row2Card.append(row2Date);
    var cityFutureTemp = $("<p>"); // Adds in the temperature and humidity lines
    cityFutureTemp.addClass("card-text");
    row2Card.append(cityFutureTemp);
    cityFutureTemp.append("Temp: ");
    var cityFutureHumid = $("<p>"); // Adds in the temperature and humidity lines
    cityFutureHumid.addClass("card-text");
    row2Card.append(cityFutureHumid);
    cityFutureHumid.append("Humidity: ");

    wrapper1Row2.append(row2Card);
    }
   wrapper1.append(wrapper1Row2);
   
    
   // ********** Part 3: Creates the search bar and search history section on the left side of the screen

    var leftSide = $("#left-side");
    var wrapper2 = $("<div>"); // Creates the container for the card
    wrapper2.addClass("container");
    var wrapper2Row1 = $("<div>"); // Creates padding for the card on the left
    wrapper2Row1.addClass("row"); 
    wrapper2Search = $("<input>");
    wrapper2Search.addClass("form-control");
    wrapper2Search.setAttribute("type", "text");

    leftSide.append(wrapper2);
    wrapper2.append(wrapper2Row1);
    wrapper2Row1.append(wrapper2Search);

})