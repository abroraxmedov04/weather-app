const API_KEY = "e034011061168cb7252d6014646cef6c";
const cardTemplate = document.querySelector(".card-template").content;
const block = document.querySelector(".block");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = inputSearch.value.trim();
  getData(inputValue);
  inputSearch.value = "";
});

async function getData(searchValue) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchValue}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    let data = await response.json();
    console.log(data);
    drawData(data, block);
  } catch (error) {
    inputSearch.classList.add("border-2", "border-red-500");
    console.error("Error fetching data:", error.message);
    setTimeout(() => {
      inputSearch.classList.remove("border-2", "border-red-500");
    }, 1000);
  }
}

function drawData(data, node) {
  node.innerHTML = "";
  let clone = cardTemplate.cloneNode(true);
  clone.querySelector(".city-name").textContent = data.name;
  clone.querySelector(".weather-num").textContent = Math.round(data.main.temp);
  clone.querySelector(".humidity").textContent = `${data.main.humidity}%`;
  clone.querySelector(".wind-speed").textContent = `${data.wind?.speed}km/h`;
  node.appendChild(clone);
}
