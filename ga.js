function nextGeneration(){
    
    calculateFitness();
        
    for(let i = 0; i < total; i++){
        balls[i] = pickOne();
    }
}


function pickOne(){

    return _____________;
}

function calculateFitness(){
    let sum = 0;
    for(let ball of balls){
        sum += ball.score;
    }
    for(let ball of balls){
        ball.fitness = ball.score/sum;
    }
    
}