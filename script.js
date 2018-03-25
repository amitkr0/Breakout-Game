var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var radiusOfBall = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth)/2;
var rightKey = false;
var leftKey = false;

var brickRow = 4;
var brickColumn = 7;
var brickWidth = 62;
var brickHeight = 20;
var brickPadding =5;
var brickOffsetTop = 5;
var brickOffsetLeft = 5;

var score = 0;
var lives = 2;

var bricks = [];
for(c=0; c<brickColumn; c++) {
    bricks[c] = [];
    for(r=0; r<brickRow; r++) {
        bricks[c][r] = { x: 0, y: 0, collided:0 };
    }
}


document.addEventListener("keydown",keyDownPressed,false);
document.addEventListener("keyup",keyUpPressed,false);
document.addEventListener('mousemove',mouseHandler,false);

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+score, 8, 390);
}

function drawLives() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Lives: "+lives, canvas.width-65, 390);
}

function keyDownPressed(e) {
    if(e.keyCode == 39) {
        rightKey = true;
    }
    else if(e.keyCode == 37) {
        leftKey = true;
    }
}

function keyUpPressed(e) {
    if(e.keyCode == 39) {
        rightKey = false;
    }
    else if(e.keyCode == 37) {
        leftKey = false;
    }
}

function mouseHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawBall(){
	context.beginPath();
	context.arc(x,y,10,0,Math.PI*2);
	context.fillStyle= "#ED0808";
	context.fill();
	context.closePath();
}


function drawPaddle(){
	context.beginPath();
	context.rect(paddleX,canvas.height - paddleHeight,paddleWidth,paddleHeight);
	context.fillStyle = "#000000";
	context.fill();
	context.closePath();
}


function drawBricks() {
    for(c=0; c<brickColumn; c++) {
        for(r=0; r<brickRow; r++) {
        	if(bricks[c][r].collided===0){
        		var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
	            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
	            bricks[c][r].x = brickX;
	            bricks[c][r].y = brickY;
	            context.beginPath();
	            context.rect(brickX, brickY, brickWidth, brickHeight);
	            context.fillStyle = "#1B564F";
	            context.fill();
	            context.closePath();	
        	}
            
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumn; c++) {
        for(r=0; r<brickRow; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight && b.collided===0) {
                dy = -dy;
                b.collided=1;
                score++;
                if(score === brickRow*brickColumn) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                }
            }
        }
    }
}

	
function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
	if(x + dx > canvas.width-radiusOfBall || x + dx < radiusOfBall) {
	    dx = -dx;
	}
	if(y + dy < radiusOfBall) {
	    dy = -dy;
	}
	else if(y + dy > canvas.height-radiusOfBall){
		if(x>paddleX && x<paddleX+paddleWidth){
			dy=-dy;
		}
		else{
			lives--;
			if(lives===0) {
                alert("Score "+score+"\nGAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = -2.5;
                dy = 2.5;
                paddleX = (canvas.width-paddleWidth)/2;
            }
		}	
	}

	if(rightKey && paddleX < canvas.width-paddleWidth){
		paddleX+=6;
	}
	if(leftKey && paddleX>0){
		paddleX-=6;
	}

	x+=dx;
	y+=dy;
	requestAnimationFrame(draw);

}
draw();