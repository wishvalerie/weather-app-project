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

function displayWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let iconElement = document.querySelector("#icon");
  let currentIcon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${currentIcon}.svg`);
  document.querySelector("#submited-city").innerHTML = `${city}, ${country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);

searchWeather("London");
