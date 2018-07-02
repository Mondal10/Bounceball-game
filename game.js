function Ballgame(){
var canvas = document.getElementById("myCanv");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var rad = 10;
var paddleWidth = 200;
var paddleHeight = 20;
var paddleX = x - 50;
var paddleY = y + 10;
// var paddleLeft = x+100
var right = false;
var left = false;
var count = 0;
var level = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();


}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

}

document.addEventListener("keydown", down, false);

function down(e) {
    if (e.keyCode == 39) {
        right = true;
        // console.log("right");
    } else if (e.keyCode == 37) {
        left = true;
        // console.log("left");
    }
}
document.addEventListener("keyup", up, false);

function up(e) {
    if (e.keyCode == 39) {
        right = false;
    } else if (e.keyCode == 37) {
        left = false;
    }
}

this.move=function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   	var text=false;
    drawBall();
    drawPaddle();
    document.getElementById("level").innerHTML = "Level: " + level;
    document.getElementById("score").innerHTML = "score: " + count ;

    //left right collision
    if (x + dx > canvas.width - rad || x + dx < rad) {
        dx = -dx;
    }

    //up down collision down condition
    if (y + dy < rad) {
        dy = -dy;
    } else if (y + dy > canvas.height - 15 - rad) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            count = count + 2;
            // console.log(count);
            document.getElementById("score").innerHTML = "score: " + count;
        } 
        else {
            
			// alert("game over");
            // document.getElementById("score").innerHTML = "Game Over";
            document.getElementById("score").innerHTML = "Your score was: " + count;
            ctx.font = "50px Georgia"; 
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
            clearInterval(interval);
        }

    if(count>10 && count<20){
    	level=1;
    	dx += 0.5;
    	dy -= 0.5;
    	paddleWidth -=2;
    	document.getElementById("level").innerHTML = "Level: " + level;
    }
    else if(count>20 && count<50){
    	level=2;
    	dx += 1.5;
    	dy -= 1;
    	paddleWidth -=5;
    	document.getElementById("level").innerHTML = "Level: " + level;
    }
    else if(count>50 && count<100){
    	level=3;
    	dx += 2;
    	dy -= 1.5;
    	paddleWidth -=6;
    	document.getElementById("level").innerHTML = "Level: " + level;
    }

}

    //move paddle right
    if (right == true) {
        paddleX += 5;
    }
    //move paddle left
    if (left == true) {
        paddleX -= 5;
    }

    x += dx;
    y += dy;
}
var interval=setInterval(this.move, 10);
}

window.onload=function(){
	var game = new Ballgame();
	game.move();

}