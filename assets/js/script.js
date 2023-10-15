//code to check if localstorage of previous searches exits

function previousSearches(){
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches'));
    const previousSearchList = $('#previousSearches');

    if (previousSearches) {
        
        previousSearches.forEach(search => {
            const liElement = $('<li>').addClass('list-group-item list-group-item-secondary text-center font-weight-bold h5').text(search);
            previousSearchList.append(liElement);

        });
            
    }
        
}

previousSearches();




//code to take users input from search bar

var searchButton = $('#searchButton');


console.log("yes");
searchButton.click(function(){
    var citySearched = $('#searchBar').val();
    console.log(citySearched);
    // Define the API URL with actual values
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=1&appid=bf9dec9324e28e79431321a378e088a9`;

// Use the fetch function to make the API request
fetch(locationUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the API response data here
    console.log(data);
    var locationData = data;
    //Storing the search to local storage

    //Seeing if it already exists
    if (localStorage.getItem('previousSearches')) {
        
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches'));

        //if the city has been searched before do not add it to the array
        if (!previousSearches.includes(citySearched)) {
            previousSearches.push(citySearched);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        }
    } else {

        const previousSearches = [citySearched];

        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));


    }


    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=bf9dec9324e28e79431321a378e088a9`;

        fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var weatherInfo = data.list;
            const currentDay = weatherInfo[0].dt_txt;
            console.log(currentDay)
            const currentDate = currentDay.substr(5,5);

            const currentTitle = citySearched + ' ' + currentDate;
            console.log(currentTitle);
            $('#currentDay').text(currentTitle);



        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
          });

    

  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });


})