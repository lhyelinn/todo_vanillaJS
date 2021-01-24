const body = document.querySelector("body");
const IMG_NUM = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);

}

function getRandom(){
    const number = Math.floor(Math.random()*IMG_NUM)+1;
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();