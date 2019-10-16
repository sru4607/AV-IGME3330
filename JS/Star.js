class Star{
    constructor(x,y,radius)
    {
        this.x = x;
        this.y = y;
        this.radius= radius;
        this.destroyed = 0;
		this.destroyedPercent = -1;
		this.toBeDestroyed = false;
        this.color = GetRandomColor();
    }
    //Draws the star based on the percent the song is through and the data taken from the analyzer node
    draw(percent,data)
    {
		
		ctx.beginPath();
		//Check if the user went back into earlier parts of the song and redraws them if need be
		if(percent < this.destroyedPercent)
		{
			this.destroyed = 0;
			this.toBeDestroyed = true;
		}
		//If the user did go back - draw logic
		if(this.toBeDestroyed)
		{
			if(this.destroyedPercent > percent)
			{
				this.drawCircles();
			}
			else if(this.destroyed == 0 && percent >= this.destroyedPercent)
			{
				this.destroyed = 0.0001;
				this.drawSparkles();
			}
			else if(this.destroyed < 5)
			{
				this.drawSparkles();
				this.destroyed++;
			}
		}
		else
		{
			//General draw logic
			//If destroyed
			if(this.destroyed != 0 && this.destroyed < 5)
			{
				this.drawSparkles();
			}
			//If not destroyed check if it should be destroyed
			else if(this.destroyed == 0)
			{
				this.drawCircles(data);
				if((Math.random()*10000.0) < percent){
					this.destroyedPercent =percent;
					this.destroyed = 0.0000001;
				}	
			}
			else{
				//Do nothing
				this.destroyed++;
			}
				
		}
    }
	//Draw the circle based on the radius and location
    drawCircles(data)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        this.drawRect(data);
        
    }
	//Draws sparkles upon the destruction
    drawSparkles()
    {
		//Sets it based on time
        this.destroyed += 0.1;
        let sparkleRadius = this.radius*3;
        let sparkleCount = Math.round(this.radius);
        ctx.fillStyle = this.color;
        let i;
        for(i =0;i<sparkleCount;i++){
            ctx.beginPath();
            let xOffSet = sparkleRadius*(Math.random()-0.5);
            let yOffSet = sparkleRadius*(Math.random()-0.5);
            ctx.arc(this.x+xOffSet,this.y+yOffSet,1,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        
	}
	//Draws the curves based on the data from the song
	drawRect(data){
		
		//pulse effect
		let avg =0;
		for(let i = 0; i < data.length; i++){
			avg += data[i]; //avg of data
		}
		avg /= data.length;
		//
		let k = avg * 0.3; //arc endpoint 
		let l = this.radius - 3; //arc midpoint

		ctx.save();
		ctx.lineWidth = 2;
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x + k, this.y);
		ctx.bezierCurveTo(this.x + l, this.y - l,this.x + l, this.y - l, this.x, this.y-k)
		//ctx.quadraticCurveTo(this.x + l, this.y - l, this.x, this.y-k); //QUAD 1
		ctx.moveTo(this.x, this.y-k);
		ctx.bezierCurveTo(this.x - l , this.y - l,this.x - l , this.y - l, this.x - k, this.y)
		//ctx.quadraticCurveTo(this.x - l , this.y - l, this.x - k, this.y); //QUAD 2
		ctx.moveTo(this.x - k,this.y);
		ctx.bezierCurveTo(this.x - l, this.y + l,this.x - l, this.y + l, this.x, this.y + k)
		//ctx.quadraticCurveTo(this.x - l, this.y + l, this.x, this.y + k); //QUAD 3
		ctx.moveTo(this.x,this.y + k);
		ctx.bezierCurveTo(this.x + l, this.y + l,this.x + l, this.y + l, this.x + k, this.y)
		//ctx.quadraticCurveTo(this.x + l, this.y + l, this.x + k, this.y); //QUAD 4
		ctx.moveTo(this.x + k, this.y);
		ctx.closePath();
		//ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
    
}
import {ctx} from "./main.js"
import {GetRandomColor} from "./Utility.js"
export {Star};