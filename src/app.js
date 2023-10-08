function showDate (timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
    let day = days[date.getDay()];

    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes} Local`  
}

function showTemperature(response) {
    
    celsiusTemp = Math.round(response.data.temperature.current);

    document.querySelector(".temperature").innerHTML = celsiusTemp; 

    document.querySelector("#conditions").innerHTML = response.data.condition.description;

    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;

    document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#city-display").innerHTML = response.data.city;

    let currentTime = document.querySelector("#date-time");
    currentTime.innerHTML = showDate(response.data.time * 1000);

    let mainIcon = document.querySelector("#display-weather-icon");
    let iconLink = response.data.condition.icon_url;
    mainIcon.setAttribute("src", iconLink);
}

function search (city) {
let apiKey = "00b38325ed040e371254ctd7ac1o8f0a";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(showTemperature);
}

function cityName(event) {
    event.preventDefault();
let city = document.querySelector("#city-input");
search(city.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", cityName);

function displayFehrenheit (event) {
event.preventDefault();
let fehereinheitTemp = document.querySelector(".temperature");
let convertedTemp = (celsiusTemp * 9) / 5 +32
fehereinheitTemp.innerHTML = Math.round(convertedTemp);
}

let fehrenheitTemp = document.querySelector("#fehreinheit");
fehrenheitTemp.addEventListener("click", displayFehrenheit);

let celsiusTemp = null;
search("Pretoria");