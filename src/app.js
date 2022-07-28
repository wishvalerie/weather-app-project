function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchWeather(city);
}

function searchWeather(city) {
  let apiKey = "7b33beed409834b33f780440ad0dda26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  let apiKey = "7b33beed409834b33f780440ad0dda26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  let currentIcon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${currentIcon}.svg`);
  document.querySelector("#submited-city").innerHTML = `${city}, ${country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coord);
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sarurday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function handlePosition(position) {
  let apiKey = "7b33beed409834b33f780440ad0dda26";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col">
            <div class="card border-warning mb-3" style="max-width: 18rem">
              <div class="card-header">${formatDay(forecastDay.dt)}</div>
              <div class="card-body">
                <img src="images/${forecastDay.weather[0].icon}.svg" />
                <p class="card-text">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}</span>
                  °C/<span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}</span>
                  °C
                </p>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", displayCurrentLocation);

searchWeather("Paris");
