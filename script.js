const searchBtn = document.querySelector(".search-box");
const input = document.querySelector(".input");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like-temp");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".c-humidity");
const sunriseTime = document.querySelector(".sunrise-time");
const sunsetTime = document.querySelector(".sunset-time");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIconContainer = document.querySelector(".weather-icon-container");
const description = document.querySelector(".description")



const currentHour = new Date().getHours();
let day = false;

if (currentHour >= 6 && currentHour < 18) {
  day = true;
}

if (day) {
  document.body.style.backgroundImage = "url('https://i.ibb.co/4mgfLhF/light-background.jpg')";
} else {
  document.body.style.backgroundImage = "url('https://i.ibb.co/MpSztWk/night-background.jpg')";
}

searchBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  getTemp();
});

async function getTemp() {
  console.log("Loding..!!!");

  const cityName = input.value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=34f5d9f52d17d59d5c6fc1e5dc89804b`
  );
  const data = await response.json();
  console.log(data);
  temp.innerHTML = Math.round(data.main.temp);
  feelsLike.innerHTML = Math.round(data.main.feels_like);
  minTemp.innerHTML = Math.round(data.main.temp_min);
  maxTemp.innerHTML = Math.round(data.main.temp_max);
  windSpeed.innerHTML = data.wind.speed;
  humidity.innerHTML = data.main.humidity;
  let sunriseTimeData = new Date(data.sys.sunrise * 1000);
  sunriseTimeData = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(sunriseTimeData);
  sunriseTime.innerHTML = sunriseTimeData;
  let sunsetTimeData = new Date(data.sys.sunset * 1000);
  sunsetTimeData = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(sunsetTimeData);
  sunsetTime.innerHTML = sunsetTimeData;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherIconContainer.style.display = "block";
  description.innerHTML = data.weather[0].description
}
