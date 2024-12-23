const searchBtn = document.querySelector(".city");

searchBtn.addEventListener("click", () => {
  console.log("Helo city Name");
});

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});
