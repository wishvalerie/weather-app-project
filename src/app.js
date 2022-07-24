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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);

searchWeather("London");
