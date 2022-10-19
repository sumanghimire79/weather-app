// Weather app

// weather api: https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=a7c9cec0afea0a25677e56ca91474164
//key = a7c9cec0afea0a25677e56ca91474164
let latitude ;
let longitude ;

let weatherUl = document.querySelector('#weatherUl');
let weatherMoreUl= document.querySelector('#weatherMoreUl');
let searchInput = document.querySelector('#weatherSearchByCity');
let button = document.querySelector('#weatherButton');

button.addEventListener('click', () => navigator.geolocation.getCurrentPosition(cityName));

//get weather by city name
function cityName(city) {
    city = searchInput.value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7c9cec0afea0a25677e56ca91474164`)
        .then(response => response.json())
        .then(weatherDisplay);
}

const getCurrentlocationWeatherButton = document.querySelector('#getCurrentlocationWeather');
getCurrentlocationWeatherButton.addEventListener('click', () => window.navigator.geolocation.getCurrentPosition(currentPosition));

//get weather by current position
function currentPosition(position) {
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a7c9cec0afea0a25677e56ca91474164`)
        .then(response => response.json())
        .then(weatherDisplay);
}

// callback function 
function weatherDisplay(weatherData) {

    // clears the list for fresh/new rendered list
    weatherUl.innerHTML = ""; 
    weatherMoreUl.innerHTML= "";
    console.log(weatherData);

    // get city Name 
    const city = weatherData.name;
    const nam = document.querySelector('#cityName');
    nam.innerText = `${city} Region`;

    // get temperature
    const temeratureInDegree = ((weatherData.main.temp) - 273.15).toFixed() + '°';

    // get feelslike
    const feelsLike = ((weatherData.main.feels_like) - 273.15).toFixed() + '°';

    // get windspeed
    const speed = weatherData.wind.speed;

    // get weather situation and icon
    let weatherSituation;
    let weatherIconCode;
    let iconimg;
    const situation = weatherData.weather.map(weatherArray => {
        weatherSituation = weatherArray.description;
        weatherIconCode = weatherArray.icon;
        iconimg = document.querySelector('#img1');
        iconimg.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
        iconimg.alt = `icon img`;
        // iconimg.href = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a7c9cec0afea0a25677e56ca91474164`; 
    });

    // get sunrise 
    const timestrSunrise = weatherData.sys.sunrise;
    let date = new Date(timestrSunrise * 1000);
    const sunRise = date.toLocaleTimeString();

    // get sunset
    const timestrSunSet = weatherData.sys.sunset;
    date = new Date(timestrSunSet * 1000);
    const sunSet = date.toLocaleTimeString();

    // get lattitude
    // const cityLattitude = weatherData.coord.lat;
    // const cityLongitude = weatherData.coord.lon;

    // get latitude, longitude and then append link to the map
    const weatherCityMap = document.querySelector('#weatherCityMap');
    const hrefs = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed`
    weatherCityMap.href = hrefs;
    weatherCityMap.innerText = `Lattidude: ${latitude.toFixed() + '°'}, Longitude ${longitude.toFixed() + '°'} `
    const linktoMap = document.querySelector('#linktoMap');
    linktoMap.href = hrefs;
    document.querySelector('#iframe1').href = hrefs;// refused to display x-option in same origin?? could not fixed this ??

    // created object from gathered info
    const weatherObject = {
        City: city,
        Temperature: temeratureInDegree,
        'Feels Like': feelsLike,
        'Weather Condition': weatherSituation
        // looks: iconimg, this did not work??
    };
   
    // loop throught the boject and append the info to the html list
    let innerText = "";
    for (let keys in weatherObject) {
        innerText = keys + ' : ' + weatherObject[keys];
        const weatherLi = document.createElement('li');
        weatherLi.innerHTML = innerText;
        weatherUl.appendChild(weatherLi);
    };

    const weatherObjectMore = {
        'Wind Speed': speed.toFixed() + ' km/h.',
        Sunrise: sunRise,
        Sunset: sunSet
    };
    let innerMoreText = "";
    for (let keys in weatherObjectMore) {
        innerMoreText = keys + ' : ' + weatherObjectMore[keys];
        const weatherMoreLi = document.createElement('li');
        weatherMoreLi.innerHTML = innerMoreText;
        weatherMoreUl.appendChild(weatherMoreLi);
    };
console.log(innerMoreText);
    //

} //end of call back function


