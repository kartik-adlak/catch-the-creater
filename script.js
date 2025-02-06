var startBtn = document.querySelector("#screen1 button");
var screens = document.querySelectorAll(".screen");
var allElems = document.querySelectorAll(".elem");
var playground = document.querySelector(".playground");
var scoreDiv = document.querySelector(".score span");
var timeDiv = document.querySelector(".time span");
var message = document.querySelector("#screen3 h5");

var selectedImage = "";
var sec = 15; 
var score = 0;
var timerInterval;

startBtn.addEventListener("click", function () {
    screens[1].style.transform = "translateY(-100%)";
});

allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
        selectedImage = elem.childNodes[3].src;
        console.log(selectedImage);
        screens[2].style.transform = "translateY(-200%)";
        createImage();
        startTimer(); 
    });
});

function createImage() {
    var newImg = document.createElement("img");
    newImg.setAttribute("src", selectedImage);
    const { h, w, rote } = getRandomLocation();
    newImg.style.left = w + "px";
    newImg.style.top = h + "px";
    newImg.style.rotate = rote + "deg";
    newImg.addEventListener("click", catchImage);
    playground.appendChild(newImg);
}

function catchImage() {
    increaseScore();
    this.style.opacity = 0;
    setTimeout(() => {
        this.remove(); 
    }, 500);
    addImages();
}

function addImages() {
    setTimeout(createImage, 1000);
    setTimeout(createImage, 1500);
}

function increaseScore() {
    score++;
    scoreDiv.innerHTML = score;
}


function startTimer() {
    clearInterval(timerInterval); 
    sec = 15;
    timeDiv.innerHTML = `0 : ${sec}`;

    timerInterval = setInterval(function () {
        sec--;
        if (sec < 0) {
            clearInterval(timerInterval); 
            gameOver(); 
            return;
        }
        timeDiv.innerHTML = `0 : ${sec < 10 ? "0" + sec : sec}`;
    }, 1000);
}

function gameOver() {
    alert(`Game Over! Your final score is: ${score}`);
    screens[2].style.transform = "translateY(0)"; 
    score = 0; 
    sec = 15; 
    playground.innerHTML = ""; 
    scoreDiv.innerHTML = score; 
}

function getRandomLocation() {
    const h = Math.random() * (window.innerHeight - 200) + 100;
    const w = Math.random() * (window.innerWidth - 200) + 100;
    const rote = Math.floor(Math.random() * 360);
    return { h, w, rote };
}


