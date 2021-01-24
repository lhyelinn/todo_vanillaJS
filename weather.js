import API_KEY from config.js;

const weatherSummary = document.querySelector(".js-weatherSummary");
const weatherNumber = document.querySelector(".js-weatherNumber");


const COORDS = "coords";

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const feelsLike = json.main.feels_like;
        const location = json.name;
        const summary = json.weather[0].main;
        weatherSummary.innerText = `${location}, ${summary}`;
        weatherNumber.innerText = `Temperature: ${temperature}\u00B0C, Feels Like: ${feelsLike}\u00B0C`;

    });
};

function saveCoords(coordsObj){
localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log();
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
};


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
loadCoords();
}
init();