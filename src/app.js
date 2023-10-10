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

function showDay(timestamp){
let date = new Date(timestamp * 1000);
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat",];
let day = date.getDay();
return days[day];
}

function forecast (response) {
    let dailyForecast = response.data.daily;

    let forecastDisplayed = document.querySelector("#forecast");
    

     let forecastHTML = `<div class="row">`;

   dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
        forecastHTML = forecastHTML + `
            <div class="col-2">
              <div id="day">${showDay(forecastDay.time)}</div>
              <img src="${forecastDay.condition.icon_url}" alt="icon of weather conditions" width="60px" id="forecast-icon">
              <div class="temp-high-low"> 
              <span class="min-temp">${Math.round(forecastDay.temperature.minimum)}</span>°
              <span class="max-temp">${Math.round(forecastDay.temperature.maximum)}</span>°C 
            </div>
            </div>`;
    }
    });
   
        forecastHTML =  forecastHTML + `</div>`;

    forecastDisplayed.innerHTML = forecastHTML;
            }


function search (city) {
let apiKey = "00b38325ed040e371254ctd7ac1o8f0a";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(showTemperature);

let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(forecastUrl).then(forecast);
}

function cityName(event) {
    event.preventDefault();
let city = document.querySelector("#city-input");
search(city.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", cityName);


let celsiusTemp = null;
search("Pretoria");
