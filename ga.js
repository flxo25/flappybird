function nextGeneration(){    
    calculateFitness();
    console.log("Generation");
    for(let i = 0; i < total; i++){
        if(i > total - 11){
            if(elitism[i-(total - 10)].fitness < savedBalls[i].fitness){
                balls[i] = savedBalls[i];
            } else {
                balls[i] = elitism[i-(total - 10)];
            }
        } else {
            balls[i] = pickOne();
        }
    }
    saveBirds = [];
}

function pickOne(){
    var index = 0;
    var r = random(1);
    //console.log(savedBalls);
    while(r > 0){
        r = r - savedBalls[index].fitness;
        index++;
    }
    index--;
    let balls = savedBalls[index];
    let child = new ball(balls.brain, sprites);
    child.mutate(); 
    return child;    
}

function calculateFitness(){
    let sum = 0;
    for(let ball of savedBalls){
        sum += ball.score;
    }
    for(let ball of savedBalls){
        ball.fitness = ball.score/sum;
    }
}   