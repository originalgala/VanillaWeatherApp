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

function showDay(daystamp){
let date = new Date(daystamp);
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat",];
let day = days[date.getDay()];
return day
}


function showForecastedTemperature(response) {

    let day1 = document.querySelector(".card-text1");
    let min1 = Math.round(response.data.daily[1].temperature.minimum);
    let max1 = Math.round(response.data.daily[1].temperature.maximum)
    day1.innerHTML = `${min1}/${max1}°C`;

    let day2 = document.querySelector(".card-text2");
    let min2 = Math.round(response.data.daily[2].temperature.minimum);
    let max2 = Math.round(response.data.daily[2].temperature.maximum)
    day2.innerHTML = `${min2}/${max2}°C`;

    let day3 = document.querySelector(".card-text3");
    let min3 = Math.round(response.data.daily[3].temperature.minimum);
    let max3 = Math.round(response.data.daily[3].temperature.maximum)
    day3.innerHTML = `${min3}/${max3}°C`;

    let day4 = document.querySelector(".card-text4");
    let min4 = Math.round(response.data.daily[4].temperature.minimum);
    let max4 = Math.round(response.data.daily[4].temperature.maximum)
    day4.innerHTML = `${min4}/${max4}°C`;

    let day5 = document.querySelector(".card-text5");
    let min5 = Math.round(response.data.daily[5].temperature.minimum);
    let max5 = Math.round(response.data.daily[5].temperature.maximum)
    day5.innerHTML = `${min5}/${max5}°C`;

    let firstIcon = document.querySelector("#card-img1");
    let firstIconLink = response.data.daily[1].condition.icon_url;
    firstIcon.setAttribute("src", firstIconLink);

    let secondIcon = document.querySelector("#card-img2");
    let secondIconLink = response.data.daily[2].condition.icon_url;
    secondIcon.setAttribute("src", secondIconLink);

    let thirdIcon = document.querySelector("#card-img3");
    let thirdIconLink = response.data.daily[3].condition.icon_url;
    thirdIcon.setAttribute("src", thirdIconLink);

    let fourthIcon = document.querySelector("#card-img4");
    let fourthIconLink = response.data.daily[4].condition.icon_url;
    fourthIcon.setAttribute("src", fourthIconLink);

    let fifthIcon = document.querySelector("#card-img5");
    let fifthIconLink = response.data.daily[5].condition.icon_url;
    fifthIcon.setAttribute("src", fifthIconLink);

let day1Title = document.querySelector(".card-title1");
    day1Title.innerHTML = showDay(response.data.daily[1].time * 1000);

    let day2Title = document.querySelector(".card-title2");
    day2Title.innerHTML = showDay(response.data.daily[2].time * 1000);

    let day3Title = document.querySelector(".card-title3");
    day3Title.innerHTML = showDay(response.data.daily[3].time * 1000);

    let day4Title = document.querySelector(".card-title4");
    day4Title.innerHTML = showDay(response.data.daily[4].time * 1000);

    let day5Title = document.querySelector(".card-title5");
    day5Title.innerHTML = showDay(response.data.daily[5].time * 1000)

}

function search (city) {
let apiKey = "00b38325ed040e371254ctd7ac1o8f0a";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(showTemperature);

let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(forecastUrl).then(showForecastedTemperature);
console.log(forecastUrl);
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