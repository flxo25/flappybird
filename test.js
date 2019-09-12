const total = 100;

let img;

var balls = [];
var pipes = [];
var savedBalls = [];


function preload(){
    img = loadImage("gil1.png");
}

function setup(){
    createCanvas(400,600);
    //image(img,0,0);
    for(var i = 0; i < total; i++){
        balls[i] = new ball();
    }
    pipes.push(new Pipe());       
}

function draw(){
    background(52, 153, 235);    
//    ellipse(50,50,50,50);
    for(var i = pipes.length-1;i >= 0; i--){
        pipes[i].show();
        pipes[i].update();

        for(let j = balls.length-1; j >= 0; j--){
            if(pipes[i].hits(balls[j])){
                //console.log("GAME OVER");
                balls.splice(j,1);
            }
        }

        if(pipes[i].x < -width){
            savedBalls.push(pipes.splice(i,1));
        }
    }

    for(let ball of balls){
        ball.think(pipes);
        ball.update();
        ball.show();
    }

    /*if(balls.length === 0){
        nextGeneration();
    }*/

    if(frameCount % 75 == 0){
        pipes.push(new Pipe());
    }

}

function keyPressed(){
    if(key = " "){
        ball.up();
    }
}