// All variables
let input = document.querySelector("input");
let btn = document.querySelector("button");
let temp = document.querySelector(".temp");
let place = document.querySelector(".city");
let humidity = document.querySelector(".percentage");
let wind = document.querySelector(".speed");
let img = document.querySelector(".weather img");
let bgImg = document.querySelector(".bgImage");
let apiKey = "55166da299ca4c8c3f1c554fecf36c21";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Check weather function
async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".wrapper").style.display = "none";
        document.querySelector(".wrapper2").style.display = "block";
        document.querySelector(".card1").style.display = "none";
        document.querySelector(".card2").style.display = "none";
    
    } else{
        document.querySelector(".wrapper").style.display = "block";
        document.querySelector(".wrapper2").style.display = "none";   
        document.querySelector(".card1").style.display = "flex";
        document.querySelector(".card2").style.display = "flex";
    }
    var data = await response.json();
    function convertUnixToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period;
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) {
                hours -= 12;
            }
        } else {
            period = 'AM';
            if (hours === 0) {
                hours = 12;
            }
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes + ' ' + period;
    }
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    
    //changing values accourding to the place
    temp.innerHTML = Math.floor(data.main.temp) + "°C";
    place.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels h1").innerHTML = Math.floor(data.main.feels_like) + "°C";
    document.querySelector(".pressure h1").innerHTML = data.main.pressure;
    document.querySelector(".min h1").innerHTML = (data.main.temp_min) + "°C";
    document.querySelector(".max h1").innerHTML = (data.main.temp_max) + "°C";
    document.querySelector(".rise h1").innerHTML = convertUnixToTime(sunrise);
    document.querySelector(".set h1").innerHTML = convertUnixToTime(sunset);
    document.querySelector(".ground h1").innerHTML = (data.main.grnd_level);
    document.querySelector(".sea h1").innerHTML = (data.main.sea_level);
    document.querySelector(".wind-temprerature h1").innerHTML = Math.floor((data.wind.deg)/100) + "°C";
    document.querySelector(".vision h1").innerHTML = (data.visibility);
    document.querySelector(".weather-type h1").innerHTML = (data.weather[0].main);
    document.querySelector(".wind-type h1").innerHTML = (data.weather[0].description);

    //changing logo and background image according to the weather type
    if(data.weather[0].main == "Mist"){
        img.src = "Images/mist.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Mist image/Image ${randomNo}.jpg`;
    }
    else if(data.weather[0].main == "Clouds"){
        img.src = "Images/clouds.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Cloud image/Image ${randomNo}.jpeg`;
    } 
    else if(data.weather[0].main == "Clear"){
        img.src = "Images/clear.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Clear image/Image ${randomNo}.jpg`;
    } 
    else if(data.weather[0].main == "Drizzle"){
        img.src = "Images/drizzle.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Mist image/Image ${randomNo}.jpg`;
    } 
    else if(data.weather[0].main == "Humidity"){
        img.src = "Images/humidity.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Mist image/Image ${randomNo}.jpg`;
    } 
    else if(data.weather[0].main == "Snow"){
        img.src = "Images/snow.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Snow image/Image ${randomNo}.jpg`;
    } 
    else if(data.weather[0].main == "Rain"){
        img.src = "Images/rain.png";
        let randomNo = Math.floor(Math.random()*5);
        bgImg.src = `Background Image/Rain image/Image ${randomNo}.jpg`;
};};

btn.addEventListener("click", ()=>{
    document.querySelector(".wrapper").style.display = "block";
    checkWeather(input.value);
});