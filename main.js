const total = 500;

var balls = [];
var pipes = [];
var savedBalls = [];
var elitism = [];
var matingPool = []
var counter = 0;
var slider;
var bg;
var pipeup;
var pipedown;
var sprites = []
var generationScore = 0;
var maxScore = 0;
var generation = 1;

function keyPressed(){
    if (key === "s"){
        let ball = balls[0];
        saveJSON(ball.brain,'ball.json');
    }
}

function setup(){
    bg = loadImage('b1.jpg');
    pipeup = loadImage('pipe-up.png');
    pipedown = loadImage('pipe-down.png');
    sprites = [loadImage('bird.png'), loadImage('bird-down.png'), loadImage('bird-up.png')]
    createCanvas(400,600);
    slider = createSlider(1,100,1);
    for(var i = 0; i < total; i++){
        balls[i] = new ball(null, sprites);
    }
}

function draw(){
    background(bg);
    fill(0,0,0)
    for(let n = 0; n < slider.value(); n++){
        if(counter % 55 == 0){
            pipes.push(new Pipe(pipeup, pipedown));
        }
        counter++;

        for(var i = pipes.length-1;i >= 0; i--){
            pipes[i].update();
            if(!pipes[i].score && pipes[i].x <= 70) {
                pipes[i].score = true;
                generationScore++;
                if(generationScore > maxScore) maxScore = generationScore;
            }
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
            if(generation === 100 || generationScore === 500){
                noLoop();
            }
        }

        if(balls.length === 0){            
            for(i=0;i<38;i++){
                elitism[i] = savedBalls[i+total-38];
            }
            counter = 0;
            nextGeneration();
            pipes = [];
            generation++;
            generationScore = 0;
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
    textSize(17);
    fill(0,0,0);
    stroke(0,0,0);
    text(`Generation score: ${this.generationScore}`, 30, 30)
    text(`Best score: ${this.maxScore}`, 30, 60)
    text(`Generation: ${this.generation}`, 30, 90)
    text(`Alive: ${this.balls.length}`, 30, 120)
}
