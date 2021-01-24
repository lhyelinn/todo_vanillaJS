const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const dateBox = document.querySelector(".date");



function getTime(){
    const date = new Date();
    const day = date.getDate();
    const weekday = date.toLocaleString('default',{weekday:'long'});
    const month = date.toLocaleString('default',{month:'long'});
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    dateBox.innerText = `${weekday}, ${month} ${day}, ${year}`
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}


function init() {
    setInterval(getTime,1000);
}

init();