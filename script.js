const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let audio = document.getElementById('sound');
let audio1 = document.getElementById('sound1');


// key press garda ra release garda 
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

let player = { speed: 5, score: 0 };
let highest = 0;

// detech user press keys

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    console.log(keys);
}


startScreen.addEventListener('click', start);

function isCollide(a, b) {
    //a gives position of player car and b gives enemy cars position
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function Reset() {
    highest = 0;
}



function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    // audio.pause();
    // audio1.pause();
    // audio.currentTime = 0;
}




function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }


        item.y += player.speed;
        item.style.top = item.y + "px";


    })
}



function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            console.log("collide")
            sound1.play()
            endGame();

        }

        if (item.y >= 700) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 450) + "px";

        }


        item.y += player.speed;
        item.style.top = item.y + "px";


    })
}




function gamePlay() {
    console.log('i am clicked');
    let road = gameArea.getBoundingClientRect();
    let car = document.querySelector('.car');

    // console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);
        if (player.score >= highest) {
            highest = player.score;
        }

        // score.innerHTML = "score:" + player.score + "highest"  ;
        score.innerHTML = "Your Score:" + player.score + "<br><br>" + "Highest Score:" + highest;


        sound.play()

        window.requestAnimationFrame(gamePlay);
        if (keys.ArrowUp && player.y > (road.top)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }
        // OR
        // if (keys.ArrowUp && player.y > 0) { player.y -= player.speed }
        // if (keys.ArrowDown && player.y < 643) { player.y += player.speed }
        // if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        // if (keys.ArrowRight && player.x < 400) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        player.score++;

    }


}


function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    // loop multiple times under same function
    window.requestAnimationFrame(gamePlay);

    let car = document.createElement('div');
    car.setAttribute('class', 'car');

    car.innerHTML = 'i am car';
    gameArea.appendChild(car);
    // OR //


    // car.innerHTML = "i am car";

    for (x = 0; x < 5; x++) {
        // creating div and adding in html when function starts
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'lines');
        roadLines.y = (x * 150)

        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);

    }



    // offset property returns the top position (in pixels) relative to the parent.  i.e left, top, bottom etc bata kati position ma xa 
       
    // console.log("left " + car.offsetLeft);
    // console.log("Top " + car.offsetTop);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 4; x++) {
        // creating div and adding in html when function starts
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 300) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.background = "green";
        enemyCar.style.left = Math.floor(Math.random() * 450) + "px";
        gameArea.appendChild(enemyCar);

    }




}