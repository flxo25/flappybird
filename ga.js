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
            balls[i] = selection();
        }
    }
    saveBirds = [];
    generation++;
    generationScore = 0;
}

function selection(){    
    //Baker sus with 2 pointer
    savedBalls = savedBalls.reverse()
    var index1 = 0;
    var index2 = 0;
    var randnum = random(1);
    var r1 = random(0.5);
    var r2 = random(0.5,1);
    
    while(r1 > 0){
        r1 = r1 - savedBalls[index1].fitness;
        index1++;
    } index1--;

    while(r2 > 0){
        r2 = r2 - savedBalls[index2].fitness;
        index2++;
    } index2--;
    //console.log(index1)
    let parent1 = savedBalls[index1];
    let parent2 = savedBalls[index2];

    //gak mau terus crossover
    //jadi crossovernya kadang-kadang aja
    //biar asik
    if(randnum > 0.5){
        crossover(parent1,parent2);
    } 

    let child = new ball(parent1.brain,sprites);
    
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

function crossover(p1,p2){
    p1.brain.weights_ih = p2.brain.weights_ih;
}