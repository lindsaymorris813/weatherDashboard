var lastCity;

$("#search-button").on("click", function () {
    event.preventDefault();
    //create button for search city
    var newCity = $("#search-input").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/find?q=" + newCity + "&units=imperial&appid=d8fde94eabbec07723a437c6948ea8a9";
    $("#city-name").html(newCity);
    localStorage.setItem("lastCity", JSON.stringify(newCity));
    var newCityDiv = $("<button>")
    newCityDiv.text(newCity);
    newCityDiv.attr("id", newCity);
    newCityDiv.attr("class", "btn btn-primary");
    $("#cities").append(newCityDiv);;
    //get API data
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        //attach temp data
        var temp = response.list[0].main.temp;
        $("#temp").html("Temperature: " + temp + "&#8457;");
        //attach humidity data
        var humidity = response.list[0].main.humidity;
        $("#humidity").html("Humidity: " + humidity + "%");
        //attach windspeed data
        var windSpeed = response.list[0].wind.speed;
        $("#wind-speed").html("Wind Speed: " + windSpeed + "kph");
        //get lat and long for UV data
        var lat = response.list[0].coord.lat;
        var lon = response.list[0].coord.lon;
        var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d8fde94eabbec07723a437c6948ea8a9"
        //new ajax to pull UV data
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function (response2) {
            console.log(response2);
            //attach UV data and color code based on levels
            var uvIndex = parseInt(response2.value);
            $("#uv-index").html("UV Index: " + uvIndex);
            if (uvIndex <= 2) {
                $("#uv-index").css("color", "green")
            } else if ((uvIndex > 2) && (uvIndex < 6)) {
                $("#uv-index").css("color", "yellow")
            } else {
                $("#uv-index").css("color", "red")
            }
        })

    })

});
//show last searched city upon loading page
function renderCity() {
    var lastCityDiv = $("<button>");
    lastCity = JSON.parse(localStorage.getItem("lastCity"))
    console.log(lastCity);
    lastCityDiv.text(lastCity);
    lastCityDiv.attr("id", lastCity);
    lastCityDiv.attr("class", "btn btn-primary");
    $("#cities").append(lastCityDiv);

}

renderCity();