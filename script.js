$(document).ready(function() {
    var wrapper0 = $("#main-body");
    // Designs the top right of the page (city name, date, and weather attributes)
    var wrapper1 = $("<div>"); // Creates the container for the card
    wrapper1.addClass("container");
    var wrapper1Padding = $("<div>"); // Creates padding for the card on the left
    wrapper1Padding.addClass("col-lg-4"); 
    var wrapper1Card = $("<div>"); // Creates the card itself
    wrapper1Card.addClass("col-lg-8");
    wrapper1Card.addClass("card");
    var wrapper1CardBody = $("<div>"); // Creates the card body
    wrapper1CardBody.addClass("card-body");
    var wrapper1CityName = $("<h4>"); // Creates the card title - city name
    wrapper1CityName.addClass("card-title");
    wrapper1CityName.append("Testing 1234");
    wrapper1CardBody.append(wrapper1CityName);

    cityWeather = ["Temperature: ", "Humidity: ", "Wind Speed: ", "UV Index: "];
    for (var i = 0; i < cityWeather.length; i++){
        var cityWeatherData = $("<p>");
        cityWeatherData.addClass("card-text");
        wrapper1CardBody.append(cityWeatherData);
        cityWeatherData.append(cityWeather[i]);
    }

    wrapper0.append(wrapper1);
    wrapper1.append(wrapper1Padding);
    wrapper1.append(wrapper1Card);
    wrapper1Card.append(wrapper1CardBody);
    
    // wrapper1CardBody.append(cityWeatherData);

    // var wrapper1CityTemp = $("<p>");  // Creates the card line - temperature
    // wrapper1CityTemp.addClass("card-text");
    // var wrapper1CityHumid = $("<p>"); // Creates the card line - humidity
    // wrapper1CityHumid.addClass("card-text");
    // var wrapper1CityWind = $("<p>"); // Creates the card line - wind speed
    // wrapper1CityWind.addClass("card-text");


    
    
})