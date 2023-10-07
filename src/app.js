function showTemperature(response) {
    console.log(response.data)
    document.querySelector(".temperature").innerHTML = Math.round(response.data.temperature.current); 

    document.querySelector("#conditions").innerHTML = response.data.condition.description;

    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;

    document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#city-display").innerHTML = response.data.city;

    document.querySelector("img") = response.data.icon_url;
}


let apiKey = "00b38325ed040e371254ctd7ac1o8f0a"
let url = `https://api.shecodes.io/weather/v1/current?query=pretoria&key=${apiKey}&units=metric`
axios.get(url).then(showTemperature);