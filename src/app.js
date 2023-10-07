function showDate (timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
    let day = days[date.getDay()];

    let hour = date.getHours();
    if (hour < 10) {
        hour = `0:${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0:${minutes}`;
    }

    return `${day} ${hour}:${minutes} Local`  
}

function showTemperature(response) {
    
    document.querySelector(".temperature").innerHTML = Math.round(response.data.temperature.current); 

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


let apiKey = "00b38325ed040e371254ctd7ac1o8f0a"
let url = `https://api.shecodes.io/weather/v1/current?query=pretoria&key=${apiKey}&units=metric`
axios.get(url).then(showTemperature);