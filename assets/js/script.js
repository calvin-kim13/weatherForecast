// GLOBAL VARIABLES
let button = document.querySelector('button');
let input = document.querySelector('input');
let currentWeatherLocation = document.querySelector('#city-location');
let currentWeatherDate = document.querySelector('#current-date');
let currentWeatherIcon = document.querySelector('#current-icon');
let currentTemp = document.querySelector('#current-temp');
let currentWind = document.querySelector('#current-wind');
let currentHumidity = document.querySelector('#current-humidity');
let uvIndex = document.querySelector('#uv-index');
let searchHistoryEl = document.querySelector('#search-history')
let today = moment();
// DAY 1 OF FORECAST
let forecastDate1 = document.querySelector('#card-date-1');
let forecastIcon1 = document.querySelector('card-icon-1');
let forecastTemp1 = document.querySelector('#card-temp-1')
let forecastWind1 = document.querySelector('#card-wind-1')
let forecastHumidity1 = document.querySelector('#card-humidity-1')
// DAY 2 OF FORECAST
let forecastDate2 = document.querySelector('#card-date-2');
let forecastIcon2 = document.querySelector('card-icon-2');
let forecastTemp2 = document.querySelector('#card-temp-2')
let forecastWind2 = document.querySelector('#card-wind-2')
let forecastHumidity2 = document.querySelector('#card-humidity-2')
// DAY 3 OF FORECAST
let forecastDate3 = document.querySelector('#card-date-3');
let forecastIcon3 = document.querySelector('card-icon-3');
let forecastTemp3 = document.querySelector('#card-temp-3')
let forecastWind3 = document.querySelector('#card-wind-3')
let forecastHumidity3 = document.querySelector('#card-humidity-3')
// DAY 4 OF FORECAST
let forecastDate4 = document.querySelector('#card-date-4');
let forecastIcon4 = document.querySelector('card-icon-4');
let forecastTemp4 = document.querySelector('#card-temp-4')
let forecastWind4 = document.querySelector('#card-wind-4')
let forecastHumidity4 = document.querySelector('#card-humidity-4')
// DAY 5 OF FORECAST
let forecastDate5 = document.querySelector('#card-date-5');
let forecastIcon5 = document.querySelector('card-icon-5');
let forecastTemp5 = document.querySelector('#card-temp-5')
let forecastWind5 = document.querySelector('#card-wind-5')
let forecastHumidity5 = document.querySelector('#card-humidity-5')

async function getCurrentWeather(cityName) {
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=a9817f56f104a1f266183d47f57438a5&units=imperial&q=${cityName}`;
    let response = await fetch(currentWeatherUrl);
    let data = await response.json();
    console.log(data);
    currentWeatherLocation.textContent = `${data.name} ${today.format("M/D/YYYY")}`;
    currentTemp.textContent = `Temp: ${data.main.temp}`;
    currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
    currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    getUvIndex(data.coord.lat, data.coord.lon);
    getFiveDayForecast(data.coord.lat, data.coord.lon);
}

async function getUvIndex(lat, lon) {
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a9817f56f104a1f266183d47f57438a5`;
    let response = await fetch(currentWeatherUrl)
    let data = await response.json();
    console.log(data)
    uvIndex.textContent = `UV Index: ${data.current.uvi}`
}

async function getFiveDayForecast(lat, lon) {
    let fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a9817f56f104a1f266183d47f57438a5&units=imperial&cnt=5`;
    let response = await fetch(fiveDayForecastUrl);
    let data = await response.json();
    console.log(data.list);
    // day 1 
    forecastDate1.textContent = moment().add(1, 'days').calendar()
    // forecastIcon1.textContent = data.weather[0].icon
    forecastTemp1.textContent = `Temp: ${data.list[0].main.temp}`
    forecastWind1.textContent = `Wind: ${data.list[0].wind.speed} MPH`
    forecastHumidity1.textContent = `Humidity: ${data.list[0].main.humidity}%`
    // day 2
    forecastDate2.textContent = moment().add(2, 'days').calendar()
    // forecastIcon2.textContent = data.weather[0].icon
    forecastTemp2.textContent = `Temp: ${data.list[1].main.temp}`
    forecastWind2.textContent = `Wind: ${data.list[1].wind.speed} MPH`
    forecastHumidity2.textContent = `Humidity: ${data.list[1].main.humidity}%`
    // day 3
    forecastDate3.textContent = moment().add(3, 'days').calendar()
    // forecastIcon3.textContent = data.weather[0].icon
    forecastTemp3.textContent = `Temp: ${data.list[2].main.temp}`
    forecastWind3.textContent = `Wind: ${data.list[2].wind.speed} MPH`
    forecastHumidity3.textContent = `Humidity: ${data.list[2].main.humidity}%`
    // day 4
    forecastDate4.textContent = moment().add(4, 'days').calendar()
    // forecastIcon4.textContent = data.weather[0].icon
    forecastTemp4.textContent = `Temp: ${data.list[3].main.temp}`
    forecastWind4.textContent = `Wind: ${data.list[3].wind.speed} MPH`
    forecastHumidity4.textContent = `Humidity: ${data.list[3].main.humidity}%`
    // day 5
    forecastDate5.textContent = moment().add(5, 'days').calendar()
    // forecastIcon5.textContent = data.weather[0].icon
    forecastTemp5.textContent = `Temp: ${data.list[4].main.temp}`
    forecastWind5.textContent = `Wind: ${data.list[4].wind.speed} MPH`
    forecastHumidity5.textContent = `Humidity: ${data.list[4].main.humidity}%`

}

function handleLocalStorage(cityName) {
    let history = JSON.parse(localStorage.getItem('city-history')) || [];
    history.push(cityName);
    localStorage.setItem('city-history', JSON.stringify(history));
    renderSearchHistory();
}

function handleSearchBtn(e) {
    e.preventDefault();
    let cityName = input.value;
    getCurrentWeather(cityName);
    handleLocalStorage(cityName);
}

function renderSearchHistory() {
    searchHistoryEl.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('city-history')) || [];
    history.forEach(element => {
        let button = document.createElement('button');
        button.textContent = element;
        searchHistoryEl.append(button);
    });
}

function handleSearchHistory(e) {
    let cityName = e.target.textContent;
    console.log(cityName);
    getCurrentWeather(cityName);
}

renderSearchHistory();
button.addEventListener('click', handleSearchBtn);
searchHistoryEl.addEventListener('click', handleSearchHistory);
