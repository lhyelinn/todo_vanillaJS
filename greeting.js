const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const DISAPPEAR_CN = "disappear";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    input.classList.add(DISAPPEAR_CN);
    greetingBasedOnTime(currentValue);
    saveName(currentValue);
}


function askForName(){
    //form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}


function paintGreeting(text){
    input.classList.add(DISAPPEAR_CN);
    //greeting.classList.add(SHOWING_CN);
    greetingBasedOnTime(text);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        greetingBasedOnTime('');
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function greetingBasedOnTime(text){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let displayedText ='';
    if (text!==''){
       displayedText = `${text}.`;
    }

    if ((hours >= 0 && hours <= 4)||hours >= 22){
        greeting.innerText = `Good night, ${displayedText}`;
    } else if (hours >= 5 && hours < 12){
        greeting.innerText = `Good morning, ${displayedText}`;
    } else if (hours >= 12 && hours <17){
        greeting.innerText = `Good afternoon, ${displayedText}`;
    } else if (hours===17&minutes>30){
        greeting.innerText = `Good evening, ${displayedText}`;
    } 
    else /*6pm to 8:59pm*/{
        greeting.innerText = `Good evening, ${displayedText}`;
    }
}


function init() {
    loadName();
}

init();
