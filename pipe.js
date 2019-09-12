function Pipe(){
    this.spacing = 125
    this.top = random(height/6, 3 / 4 * height); //100 
    this.bottom = height - (this.top + this.spacing); //375
    this.x = width; //400
    this.w = 20; 
    this.speed = 3;

    this.show = function(){
        fill(255);
        rect(this.x,0,this.w,this.top); //400,0,20,100
        rect(this.x,height-this.bottom,this.w,this.bottom); //400,225,20,375
    }

    this.update = function(){
        this.x -= this.speed;
    }

    this.hits = function(ball){
        if(ball.y < this.top || ball.y > height - this.bottom){
            if(ball.x > this.x && ball.x < this.x + this.w){
                ball.velocity = 0;
                return true;                
            }
        }
        return false;
    }

}