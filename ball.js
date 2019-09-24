class ball{
    constructor(brain, sprites){
        this.y = height / 2;
        this.x = 70;

        this.gravity = 0.9;
        this.lift = -15;
        this.velocity = 0;

        this.score = 0;
        this.fitness = 0;
		this.sprites = sprites;
		this.score = false;
		this.color = "#"+((1<<24)*Math.random()|0).toString(16)

        if(brain){
        	this.brain = brain.copy();
        } else {
        	this.brain = new NeuralNetwork(5,8,2);
        }
    }

    show(){
    	fill(235, 229, random(256));
		stroke(255);
		let rgb = this.hexTorgb(this.color)
		//tint(rgb[0], rgb[1], rgb[2])
		image(this.sprites[this.velocity <= 0 ? 1 : this.velocity >= 1 ? 2 : 0], this.x, this.y, 32, 24);
		//noTint()
    }

    think(pipes){
    	let closest = null;
    	let closestD = Infinity;

    	for(let i = 0; i < pipes.length; i++){
    		let d = pipes[i].x + pipes[i].w - this.x;
    		if(d < closestD && d > 0){
    			closest = pipes[i];
    			closestD = d;
    		}
    	}

    	let inputs = [];

    	inputs[0] = this.y / height;
    	inputs[1] = closest.top / height;
    	inputs[2] = closest.bottom / height;
    	inputs[3] = closest.x / width;
    	inputs[4] = this.velocity / 10;

    	let output = this.brain.predict(inputs);
    	if(output[0] > output[1]){
    		this.up();
    	}
    }

    offscreen(){
        return (this.y > height || this.y < 0);
    }

    update(){
    	this.score++;
    	this.velocity += this.gravity;
    	//this.velocity *= 0.9
        this.y += this.velocity;
    }

    up(){
    	this.velocity += this.lift;
    }

	mutate(){
		this.brain.mutate(0.2);
	}    

	hexTorgb(hex) {
		return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
	}
}