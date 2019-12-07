function nextGeneration(){    
    calculateFitness();
    savedBalls.reverse();
    var offspring = selection();
    offspring = offspring.concat(elitism);
    for(let i = 0; i < total; i++){
        balls[i] = offspring[i];
    }
    savedBalls = [];
}

function selection(){    
    //Baker sus with 22 pointer
    const pointer = 22;
    var index = new Array(pointer).fill(0);
    var r = [];
    r[0] = random(0, 1/pointer)

    for(let i = 1; i < pointer; i++) r[i] = r[i-1] + (1/pointer)
    for(let i = 0; i < pointer; i++) {
        while(r[i] > 0) {
            r[i] = r[i] - savedBalls[index[i]].fitness;
            index[i] = index[i] + 1;
        } index[i] = index[i] - 1;
    }

    var offspring = [];
    for(let i = 0; i < pointer-1; i++) {
        for(let j = i+1; j < pointer; j++) {
            let child = crossover(savedBalls[index[i]], savedBalls[index[j]])
            child[0].mutate()
            child[1].mutate()
            offspring.push(child[0])
            offspring.push(child[1])
        }
    }
    return offspring;    
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

function crossover(p1,p2){
    const b1 = p1.brain.copy(), b2 = p2.brain.copy();

    var tmp = b1.weights_ho,alpha = 0.7;
    for(let i=0; i < b1.weights_ho.rows; i++){
        for(let j=0; j < b1.weights_ho.cols; j++){
            b1.weights_ho.data[i][j] = b2.weights_ho.data[i][j]*alpha + (1-alpha)*tmp.data[i][j];
            b2.weights_ho.data[i][j] = tmp.data[i][j]*alpha + b2.weights_ho.data[i][j]*(1-alpha);
        }
    }

    return [new ball(b1, sprites), new ball(b2, sprites)]
}