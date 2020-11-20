var lastCity;
var queryURL;

$("#search-button").on("click", function () {
    event.preventDefault();
    clearCity();
    //create button for search city
    var newCity = $("#search-input").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/find?q=" + newCity + "&units=imperial&appid=d8fde94eabbec07723a437c6948ea8a9";
    $("#city-name").html(newCity);
    localStorage.setItem("lastCity", JSON.stringify(newCity));
    var newCityDiv = $("<div>")
    var newCityBtn = $("<button>")
    newCityBtn.text(newCity);
    newCityBtn.attr("id", "cityBtn");
    newCityBtn.attr("data-city", newCity);
    newCityBtn.attr("class", "btn btn-primary mt-3");
    newCityDiv.append(newCityBtn)
    $("#cities").prepend(newCityDiv);

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
        var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d8fde94eabbec07723a437c6948ea8a9"
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
            //create five day forecasts and attached to div
            var fiveDayQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&units=imperial&appid=579a0c02898001e4b2c9f684f0325b28"
            $.ajax({
                url: fiveDayQuery,
                method: "GET"
            }).then(function (response3) {
                console.log(response3);
                var date1Card = $("#day-1-date")
                //pull day 1 data
                var date1 = moment().add(1, 'days').format('L')
                date1Card.text(date1);
                //icon
                console.log(response3.list[0].weather[0].icon);
                var forecast1 = response3.list[0].weather[0].icon;
                var icon1 = $("<img>");
                var icon1URL = "http://openweathermap.org/img/wn/" + forecast1 + "@2x.png";
                icon1.attr("src", icon1URL);
                $("#day-1-icon").append(icon1);
                //hi temp
                var tempHi1 = response3.list[0].main.temp_max;
                $("#day-1-hi-temp").append("Hi Temp: " + tempHi1 + "&#8457;")
                //lo temp
                var tempLo1 = response3.list[0].main.temp_min;
                $("#day-1-low-temp").append("Low Temp: " + tempLo1 + "&#8457;");
                //humidity
                var humidity1 = response3.list[0].main.humidity;
                $("#day-1-humidity").append("Humidity: " + humidity1);
                var date2Card = $("#day-2-date")
                //pull day 2 data
                var date2 = moment().add(2, 'days').format('L');
                date2Card.text(date2);
                var forecast2 = response3.list[1].weather[0].icon;
                var icon2 = $("<img>");
                var icon2URL = "http://openweathermap.org/img/wn/" + forecast2 + "@2x.png";
                icon2.attr("src", icon2URL);
                $("#day-2-icon").append(icon2);
                var tempHi2 = response3.list[1].main.temp_max;
                $("#day-2-hi-temp").append("Hi Temp: " + tempHi2 + "&#8457;")
                var tempLo2 = response3.list[1].main.temp_min;
                $("#day-2-low-temp").append("Low Temp: " + tempLo2 + "&#8457;");
                var humidity2 = response3.list[1].main.humidity;
                $("#day-2-humidity").append("Humidity: " + humidity2);
                var date3Card = $("#day-3-date")
                //pull day 3 data
                var date3 = moment().add(3, 'days').format('L');
                date3Card.text(date3);
                var forecast3 = response3.list[2].weather[0].icon;
                var icon = $("<img>");
                var iconURL = "http://openweathermap.org/img/wn/" + forecast3 + "@2x.png";
                icon.attr("src", iconURL);
                $("#day-3-icon").append(icon);
                var tempHi = response3.list[2].main.temp_max;
                $("#day-3-hi-temp").append("Hi Temp: " + tempHi + "&#8457;")
                var tempLo = response3.list[2].main.temp_min;
                $("#day-3-low-temp").append("Low Temp: " + tempLo + "&#8457;");
                var humidity3 = response3.list[2].main.humidity;
                $("#day-3-humidity").append("Humidity: " + humidity3);

                var date4Card = $("#day-4-date")
                //pull day 4 data
                var date4 = moment().add(4, 'days').format('L');
                date4Card.text(date4);
                var forecast4 = response3.list[3].weather[0].icon;
                var icon4 = $("<img>");
                var icon4URL = "http://openweathermap.org/img/wn/" + forecast4 + "@2x.png";
                icon4.attr("src", icon4URL);
                $("#day-4-icon").append(icon4);
                var tempHi4 = response3.list[3].main.temp_max;
                $("#day-4-hi-temp").append("Hi Temp: " + tempHi4 + "&#8457;")
                var tempLo4 = response3.list[3].main.temp_min;
                $("#day-4-low-temp").append("Low Temp: " + tempLo4 + "&#8457;");
                var humidity4 = response3.list[3].main.humidity;
                $("#day-4-humidity").append("Humidity: " + humidity4);

                var date5Card = $("#day-5-date")
                //pull day 5 data
                var date5 = moment().add(5, 'days').format('L');
                date5Card.text(date5);
                console.log(response3.list[4].weather[0].icon)
                var forecast5 = response3.list[4].weather[0].icon;
                var icon5 = $("<img>");

                var icon5URL = "http://openweathermap.org/img/wn/" + forecast5 + "@2x.png";
                icon5.attr("src", icon5URL);
                $("#day-5-icon").append(icon5);
                var tempHi5 = response3.list[4].main.temp_max;
                $("#day-5-hi-temp").append("Hi Temp: " + tempHi5 + "&#8457;")
                var tempLo5 = response3.list[4].main.temp_min;
                $("#day-5-low-temp").append("Low Temp: " + tempLo5 + "&#8457;");
                var humidity5 = response3.list[4].main.humidity;
                $("#day-5-humidity").append("Humidity: " + humidity5);
                //was having issues with icon so removed loop to pinpoint issue, didnt have time to fix
            })
        })

    })
})

$("#cities").on("click", function () {
    findCity = ($(this).text());
    console.log(findCity);
    queryURL = "http://api.openweathermap.org/data/2.5/find?q=" + findCity + "&units=imperial&appid=d8fde94eabbec07723a437c6948ea8a9";
    getWeatherData();

})


//show last searched city upon loading page
function renderCity() {
    var lastCityDiv = $("<button>");
    lastCity = JSON.parse(localStorage.getItem("lastCity"))
    lastCityDiv.text(lastCity);
    lastCityDiv.attr("id", "cityBtn");
    lastCityDiv.attr("data-city", lastCity)
    lastCityDiv.attr("class", "btn btn-primary mt-3");
    $("#cities").append(lastCityDiv);

}

function clearCity() {
    $("#temp").html("");
    $("#humidity").html("");
    $("#wind-speed").html("");
    $("#uv-index").html("");
    $("#day-1-icon").html("");
    $("#day-1-hi-temp").html("");
    $("#day-1-low-temp").html("");
    $("#day-1-humidity").html("");
    $("#day-2-icon").html("");
    $("#day-2-hi-temp").html("");
    $("#day-2-low-temp").html("");
    $("#day-2-humidity").html("");
    $("#day-3-icon").html("");
    $("#day-3-hi-temp").html("");
    $("#day-3-low-temp").html("");
    $("#day-3-humidity").html("");
    $("#day-4-icon").html("");
    $("#day-4-hi-temp").html("");
    $("#day-4-low-temp").html("");
    $("#day-4-humidity").html("");
    $("#day-5-icon").html("");
    $("#day-5-hi-temp").html("");
    $("#day-5-low-temp").html("");
    $("#day-5-humidity").html("");
}

renderCity();



function getWeatherData() {
    clearCity();
    $("#city-name").html(lastCity);
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
        var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d8fde94eabbec07723a437c6948ea8a9"
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
            //create five day forecasts and attached to div
            var fiveDayQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + findCity + "&units=imperial&appid=579a0c02898001e4b2c9f684f0325b28"
            $.ajax({
                url: fiveDayQuery,
                method: "GET"
            }).then(function (response3) {
                console.log(response3);
                var date1Card = $("#day-1-date")
                //pull day 1 data
                var date1 = moment().add(1, 'days').format('L')
                date1Card.text(date1);
                //icon
                console.log(response3.list[0].weather[0].icon);
                var forecast1 = response3.list[0].weather[0].icon;
                var icon1 = $("<img>");
                var icon1URL = "http://openweathermap.org/img/wn/" + forecast1 + "@2x.png";
                icon1.attr("src", icon1URL);
                $("#day-1-icon").append(icon1);
                //hi temp
                var tempHi1 = response3.list[0].main.temp_max;
                $("#day-1-hi-temp").append("Hi Temp: " + tempHi1 + "&#8457;")
                //lo temp
                var tempLo1 = response3.list[0].main.temp_min;
                $("#day-1-low-temp").append("Low Temp: " + tempLo1 + "&#8457;");
                //humidity
                var humidity1 = response3.list[0].main.humidity;
                $("#day-1-humidity").append("Humidity: " + humidity1);
                var date2Card = $("#day-2-date")
                //pull day 2 data
                var date2 = moment().add(2, 'days').format('L');
                date2Card.text(date2);
                var forecast2 = response3.list[1].weather[0].icon;
                var icon2 = $("<img>");
                var icon2URL = "http://openweathermap.org/img/wn/" + forecast2 + "@2x.png";
                icon2.attr("src", icon2URL);
                $("#day-2-icon").append(icon2);
                var tempHi2 = response3.list[1].main.temp_max;
                $("#day-2-hi-temp").append("Hi Temp: " + tempHi2 + "&#8457;")
                var tempLo2 = response3.list[1].main.temp_min;
                $("#day-2-low-temp").append("Low Temp: " + tempLo2 + "&#8457;");
                var humidity2 = response3.list[1].main.humidity;
                $("#day-2-humidity").append("Humidity: " + humidity2);
                var date3Card = $("#day-3-date")
                //pull day 3 data
                var date3 = moment().add(3, 'days').format('L');
                date3Card.text(date3);
                var forecast3 = response3.list[2].weather[0].icon;
                var icon = $("<img>");
                var iconURL = "http://openweathermap.org/img/wn/" + forecast3 + "@2x.png";
                icon.attr("src", iconURL);
                $("#day-3-icon").append(icon);
                var tempHi = response3.list[2].main.temp_max;
                $("#day-3-hi-temp").append("Hi Temp: " + tempHi + "&#8457;")
                var tempLo = response3.list[2].main.temp_min;
                $("#day-3-low-temp").append("Low Temp: " + tempLo + "&#8457;");
                var humidity3 = response3.list[2].main.humidity;
                $("#day-3-humidity").append("Humidity: " + humidity3);

                var date4Card = $("#day-4-date")
                //pull day 4 data
                var date4 = moment().add(4, 'days').format('L');
                date4Card.text(date4);
                var forecast4 = response3.list[3].weather[0].icon;
                var icon4 = $("<img>");
                var icon4URL = "http://openweathermap.org/img/wn/" + forecast4 + "@2x.png";
                icon4.attr("src", icon4URL);
                $("#day-4-icon").append(icon4);
                var tempHi4 = response3.list[3].main.temp_max;
                $("#day-4-hi-temp").append("Hi Temp: " + tempHi4 + "&#8457;")
                var tempLo4 = response3.list[3].main.temp_min;
                $("#day-4-low-temp").append("Low Temp: " + tempLo4 + "&#8457;");
                var humidity4 = response3.list[3].main.humidity;
                $("#day-4-humidity").append("Humidity: " + humidity4);

                var date5Card = $("#day-5-date")
                //pull day 5 data
                var date5 = moment().add(5, 'days').format('L');
                date5Card.text(date5);
                console.log(response3.list[4].weather[0].icon)
                var forecast5 = response3.list[4].weather[0].icon;
                var icon5 = $("<img>");

                var icon5URL = "http://openweathermap.org/img/wn/" + forecast5 + "@2x.png";
                icon5.attr("src", icon5URL);
                $("#day-5-icon").append(icon5);
                var tempHi5 = response3.list[4].main.temp_max;
                $("#day-5-hi-temp").append("Hi Temp: " + tempHi5 + "&#8457;")
                var tempLo5 = response3.list[4].main.temp_min;
                $("#day-5-low-temp").append("Low Temp: " + tempLo5 + "&#8457;");
                var humidity5 = response3.list[4].main.humidity;
                $("#day-5-humidity").append("Humidity: " + humidity5);

            })
        })

    })
}

