var button = document.querySelector('button');
var input = document.querySelector('input');
var currentWeatherLocation = document.querySelector('#city-location');
var currentWeatherDate = document.querySelector('#current-date');
var currentWeatherIcon = document.querySelector('#current-icon');
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHumidity = document.querySelector('#current-humidity');
var uvIndex = document.querySelector('#uv-index');
var today = moment();

function getCurrentWeather(event) {
    event.preventDefault();
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=a9817f56f104a1f266183d47f57438a5&units=imperial&q=${input.value}`
    fetch(currentWeatherUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(data) {
            console.log(data);
            var iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            currentWeatherLocation.textContent = data.name;
            currentWeatherDate.textContent = today.format("M/D/YYYY")
            // currentWeatherIcon.setAttribute('src', iconUrl);
            currentTemp.textContent = data.main.temp;
        })
}



button.addEventListener('click', getCurrentWeather)

