const total = 500;

var balls = [];
var pipes = [];
var savedBalls = [];
var elitism = [];
var counter = 0;
var slider;
var bg;
var pipeup;
var pipedown;


function keyPressed(){
    if (key === "s"){
        let ball =balls[0];
        saveJSON(ball.brain,'ball.json');
    }
}

function setup(){
    bg = loadImage('background.jpg');
    pipeup = loadImage('pipe-up.png');
    pipedown = loadImage('pipe-down.png');
    createCanvas(400,600);
    slider = createSlider(1,100,1);
    for(var i = 0; i < total; i++){
        balls[i] = new ball();
    }
}

function draw(){
    background(bg);
    for(let n = 0; n < slider.value(); n++){
        if(counter % 60 == 0){
            pipes.push(new Pipe(pipeup, pipedown));
        }
        counter++;

        for(var i = pipes.length-1;i >= 0; i--){
            pipes[i].update();
            for(let j = balls.length-1; j >= 0; j--){
                if(pipes[i].hits(balls[j])){
                    savedBalls.push(balls.splice(j,1)[0]);
                }
            }

            if(pipes[i].x < -width){
                pipes.splice(i,1);
            }
        }

        for(let i = balls.length-1; i >= 0; i--){
            if(balls[i].offscreen()){
                savedBalls.push(balls.splice(i,1)[0]);
            }
        }

        for(let ball of balls){
            ball.think(pipes);
            ball.update();
        }

        if(balls.length === 0){            
            for(i=0;i<10;i++){
                elitism[i] = savedBalls[i+total-10];
            }
            counter = 0;
            nextGeneration();
            pipes = [];
        }

    }

    //Drawing stuff
    //background(52, 153, 235);
    //background(loadImage('background.jpg'))
    //image(loadImage('background.jpg'), 0, 0)

    for(let ball of balls){
        ball.show();
    }

    for(let pipe of pipes){
        pipe.show();
    }
}
