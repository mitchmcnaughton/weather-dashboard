//code to check if localstorage of previous searches exits

function previousSearches(){
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches'));
    const previousSearchList = $('#previousSearches');

    if (previousSearches) {

        previousSearches.forEach(search => {
        //checking to see if its already been searched
        if ($('.search-buttons').filter(function() {
            return $(this).text() ===search;
        }).length === 0) {
            //else add classes to format it and append it to the previous searches
            const liElement = $('<li>').addClass('search-buttons list-group-item list-group-item-secondary text-center font-weight-bold h5').text(search);
            previousSearchList.append(liElement);
            }
        });
            
    }
        
}

//runs it to update if someone has searched
setInterval(previousSearches, 1000);

//code to take users input from search bar
var searchButton = $('#searchButton');

//click function
searchButton.click(function(){
    //grabs the value from search bar
    var citySearched = $('#searchBar').val();

    // api url
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=1&appid=bf9dec9324e28e79431321a378e088a9`;

    // fetch request
    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
        var locationData = data;
        //storing the search to local storage

    //Seeing if it already exists
    if (localStorage.getItem('previousSearches')) {
        
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches'));

        //if the city has been searched before do not add it to the array
        if (!previousSearches.includes(citySearched)) {
            previousSearches.push(citySearched);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        }
    } else {
        //else store in it local storage
        const previousSearches = [citySearched];
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));

    }

    //api request for 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=metric&appid=bf9dec9324e28e79431321a378e088a9`;
        //fetch request
        fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var weatherInfo = data.list;
           
           //changing cityname date, emoji, temp, wind, humidty for the bigger box below header
            $('#currentDay').text(citySearched + " " + weatherInfo[0].dt_txt.substr(5,5));
            $('#currentTemp').text("Temp: " + weatherInfo[0].main.temp +" C°")
            if(weatherInfo[0].weather[0].main === "Clouds") {
                console.log(weatherInfo[0].weather[0].main);
                $("#currentDay").text($("#currentDay").text() + " ☁️");
            } else if (weatherInfo[0].weather[0].main === "Rain") {
                $("#currentDay").text($("#currentDay").text() + " 🌧️");
            } else (
                $("#currentDay").text($("#currentDay").text() + " ☀️")
            )
            $('#currentWind').text("Wind: " + weatherInfo[0].wind.speed +" KM/H");
            $('#currentHumid').text("Humidity: " + weatherInfo[0].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the first grey box
            $('#firstDay').text(weatherInfo[7].dt_txt.substr(5,5));
            if(weatherInfo[7].weather[0].main === "Clouds") {
                $('#firstWeather').text("☁️")
            } else if (weatherInfo[7].weather[0].main === "Rain") {
                $('#firstWeather').text("🌧️")
            } else (
                $('#firstWeather').text("☀️")
            )
            $('#firstTemp').text("Temp: " + weatherInfo[7].main.temp +" C°");
            $('#firstWind').text("Wind: " + weatherInfo[7].wind.speed +" KM/H");
            $('#firstHumid').text("Humidity: " + weatherInfo[7].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the second grey box
            $('#secondDay').text(weatherInfo[14].dt_txt.substr(5,5));
            if(weatherInfo[14].weather[0].main === "Clouds") {
                $('#secondWeather').text("☁️")
            } else if (weatherInfo[14].weather[0].main === "Rain") {
                $('#secondWeather').text("🌧️")
            } else (
                $('#secondWeather').text("☀️")
            )
            $('#secondTemp').text("Temp: " + weatherInfo[14].main.temp +" C°");
            $('#secondWind').text("Wind: " + weatherInfo[14].wind.speed +" KM/H");
            $('#secondHumid').text("Humidity: " + weatherInfo[14].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the third grey box
            $('#thirdDay').text(weatherInfo[21].dt_txt.substr(5,5));
            if(weatherInfo[21].weather[0].main === "Clouds") {
                $('#thirdWeather').text("☁️")
            } else if (weatherInfo[21].weather[0].main === "Rain") {
                $('#thirdWeather').text("🌧️")
            } else (
                $('#thirdWeather').text("☀️")
            )
            $('#thirdTemp').text("Temp: " + weatherInfo[21].main.temp +" C°");
            $('#thirdWind').text("Wind: " + weatherInfo[21].wind.speed +" KM/H");
            $('#thirdHumid').text("Humidity: " + weatherInfo[21].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the fourth grey box
            $('#fourthDay').text(weatherInfo[28].dt_txt.substr(5,5));
            if(weatherInfo[28].weather[0].main === "Clouds") {
                $('#fourthWeather').text("☁️")
            } else if (weatherInfo[28].weather[0].main === "Rain") {
                $('#fourthWeather').text("🌧️")
            } else (
                $('#fourthWeather').text("☀️")
            )
            $('#fourthTemp').text("Temp: " + weatherInfo[28].main.temp +" C°");
            $('#fourthWind').text("Wind: " + weatherInfo[28].wind.speed +" KM/H");
            $('#fourthHumid').text("Humidity: " + weatherInfo[28].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the fifth grey box
            $('#fifthDay').text(weatherInfo[35].dt_txt.substr(5,5));
            if(weatherInfo[35].weather[0].main === "Clouds") {
                $('#fifthWeather').text("☁️")
            } else if (weatherInfo[35].weather[0].main === "Rain") {
                $('#fifthWeather').text("🌧️")
            } else (
                $('#fifthWeather').text("☀️")
            )
            $('#fifthTemp').text("Temp: " + weatherInfo[35].main.temp +" C°");
            $('#fifthWind').text("Wind: " + weatherInfo[35].wind.speed +" KM/H");
            $('#fifthHumid').text("Humidity: " + weatherInfo[35].main.humidity + "%");


        })
        .catch(error => {
            // error handler
            console.error('Error:', error);
          });

    
  })
  .catch(error => {
    // error handler
    console.error('Error:', error);
  });

});



//click event for previous searches
$("#previousSearches").on("click", ".search-buttons", function() {
    //get the text content of the button
    var citySearched = $(this).text(); 
    //api request for weather deatils
    const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=1&appid=bf9dec9324e28e79431321a378e088a9`;

// fetch request
fetch(locationUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var locationData = data;
   
    //seeing if it already exists
    if (localStorage.getItem('previousSearches')) {
        
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches'));

        //if the city has been searched before do not add it to the array
        if (!previousSearches.includes(citySearched)) {
            previousSearches.push(citySearched);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        }
    } else {
        //else store in it local storage
        const previousSearches = [citySearched];
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches))
    }

    //defining the api link
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=metric&appid=bf9dec9324e28e79431321a378e088a9`;
        //fetch request
        fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var weatherInfo = data.list;
           
        
           //changing cityname date, emoji, temp, wind, humidty for the bigger box below header
            $('#currentDay').text(citySearched + " " + weatherInfo[0].dt_txt.substr(5,5));
            $('#currentTemp').text("Temp: " + weatherInfo[0].main.temp +" C°")
            if(weatherInfo[0].weather[0].main === "Clouds") {
                console.log(weatherInfo[0].weather[0].main);
                $("#currentDay").text($("#currentDay").text() + " ☁️");
            } else if (weatherInfo[0].weather[0].main === "Rain") {
                $("#currentDay").text($("#currentDay").text() + " 🌧️");
            } else (
                $("#currentDay").text($("#currentDay").text() + " ☀️")
            )
            $('#currentWind').text("Wind: " + weatherInfo[0].wind.speed +" KM/H");
            $('#currentHumid').text("Humidity: " + weatherInfo[0].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the first grey box
            $('#firstDay').text(weatherInfo[7].dt_txt.substr(5,5));
            if(weatherInfo[7].weather[0].main === "Clouds") {
                $('#firstWeather').text("☁️")
            } else if (weatherInfo[7].weather[0].main === "Rain") {
                $('#firstWeather').text("🌧️")
            } else (
                $('#firstWeather').text("☀️")
            )
            $('#firstTemp').text("Temp: " + weatherInfo[7].main.temp +" C°");
            $('#firstWind').text("Wind: " + weatherInfo[7].wind.speed +" KM/H");
            $('#firstHumid').text("Humidity: " + weatherInfo[7].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the second grey box
            $('#secondDay').text(weatherInfo[14].dt_txt.substr(5,5));
            if(weatherInfo[14].weather[0].main === "Clouds") {
                $('#secondWeather').text("☁️")
            } else if (weatherInfo[14].weather[0].main === "Rain") {
                $('#secondWeather').text("🌧️")
            } else (
                $('#secondWeather').text("☀️")
            )
            $('#secondTemp').text("Temp: " + weatherInfo[14].main.temp +" C°");
            $('#secondWind').text("Wind: " + weatherInfo[14].wind.speed +" KM/H");
            $('#secondHumid').text("Humidity: " + weatherInfo[14].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the third grey box
            $('#thirdDay').text(weatherInfo[21].dt_txt.substr(5,5));
            if(weatherInfo[21].weather[0].main === "Clouds") {
                $('#thirdWeather').text("☁️")
            } else if (weatherInfo[21].weather[0].main === "Rain") {
                $('#thirdWeather').text("🌧️")
            } else (
                $('#thirdWeather').text("☀️")
            )
            $('#thirdTemp').text("Temp: " + weatherInfo[21].main.temp +" C°");
            $('#thirdWind').text("Wind: " + weatherInfo[21].wind.speed +" KM/H");
            $('#thirdHumid').text("Humidity: " + weatherInfo[21].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the fourth grey box
            $('#fourthDay').text(weatherInfo[28].dt_txt.substr(5,5));
            if(weatherInfo[28].weather[0].main === "Clouds") {
                $('#fourthWeather').text("☁️")
            } else if (weatherInfo[28].weather[0].main === "Rain") {
                $('#fourthWeather').text("🌧️")
            } else (
                $('#fourthWeather').text("☀️")
            )
            $('#fourthTemp').text("Temp: " + weatherInfo[28].main.temp +" C°");
            $('#fourthWind').text("Wind: " + weatherInfo[28].wind.speed +" KM/H");
            $('#fourthHumid').text("Humidity: " + weatherInfo[28].main.humidity + "%");
            
            //changing date, emoji, temp, wind, humidty for the fifth grey box
            $('#fifthDay').text(weatherInfo[35].dt_txt.substr(5,5));
            if(weatherInfo[35].weather[0].main === "Clouds") {
                $('#fifthWeather').text("☁️")
            } else if (weatherInfo[35].weather[0].main === "Rain") {
                $('#fifthWeather').text("🌧️")
            } else (
                $('#fifthWeather').text("☀️")
            )
            $('#fifthTemp').text("Temp: " + weatherInfo[35].main.temp +" C°");
            $('#fifthWind').text("Wind: " + weatherInfo[35].wind.speed +" KM/H");
            $('#fifthHumid').text("Humidity: " + weatherInfo[35].main.humidity + "%");

        })
        .catch(error => {
            // error handler
            console.error('Error:', error);
          });

  })
  .catch(error => {
    // error handler
    console.error('Error:', error);
  });

});
