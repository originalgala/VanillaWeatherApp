function showTemperature(response) {
    document.querySelector(".temperature").innerHTML = Math.round(response.data.main.temp); 

    document.querySelector("#conditions").innerHTML = response.data.weather[0].main;

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;

    document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#city-display").innerHTML = response.data.name;
}


let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873"
let url = `https://api.openweathermap.org/data/2.5/weather?q=rosslyn&appid=${apiKey}&units=metric`
axios.get(url).then(showTemperature);