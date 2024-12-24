const searchBtn = document.querySelector(".city");
const input = document.querySelector(".input");
const temp = document.querySelector(".temp");


searchBtn.addEventListener("click", () => {
  getTemp()
});


async function getTemp() {
    const cityName = input.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=34f5d9f52d17d59d5c6fc1e5dc89804b`)
    const data = await response.json();
    console.log(data);
    temp.innerHTML = (data.main.temp);
}


