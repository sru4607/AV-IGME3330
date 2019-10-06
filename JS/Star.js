class Star{
    constructor(x,y,radius)
    {
        this.x = x;
        this.y = y;
		this.radius= radius;
        this.destroyed = 0;
		this.destroyedPercent = -1;
		this.toBeDestroyed = false;
		this.burnOut = false;
        
    }
    
    draw(percent)
    {
		ctx.beginPath();
		if(percent < this.destroyedPercent)
		{
			this.destroyed = 0;
			this.toBeDestroyed = true;
		}
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
			if(this.destroyed != 0 && this.destroyed < 5)
			{
				this.drawSparkles();
			}
			else if(this.destroyed == 0)
			{
				this.drawCircles();
				if((Math.random()*100.0) < percent){
					this.destroyedPercent =percent;
					this.destroyed = 0.0000001;
				}	
			}
			else
				//Do nothing
				this.destroyed++;
		}
    }
    drawCircles()
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		//ctx.arc(this.x,this.y,1,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        
    }
    drawSparkles()
    {
        this.destroyed += 0.1;
        let sparkleRadius = this.radius*3;
        let sparkleCount = Math.round(this.radius);
        ctx.fillStyle = "white";
        let i;
        for(i =0;i<sparkleCount;i++){
            ctx.beginPath();
            let xOffSet = sparkleRadius*(Math.random()-0.5);
            let yOffSet = sparkleRadius*(Math.random()-0.5);
            ctx.arc(this.x+xOffSet,this.y+yOffSet,1,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
		}
		this.burnOut = true;
        
	}
	drawRectangles(data){


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
		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(this.x + k, this.y);
		ctx.quadraticCurveTo(this.x + l, this.y - l, this.x, this.y-k); //QUAD 1
		ctx.moveTo(this.x, this.y-k);
		ctx.quadraticCurveTo(this.x - l , this.y - l, this.x - k, this.y); //QUAD 2
		ctx.moveTo(this.x - k,this.y);
		ctx.quadraticCurveTo(this.x - l, this.y + l, this.x, this.y + k); //QUAD 3
		ctx.moveTo(this.x,this.y + k);
		ctx.quadraticCurveTo(this.x + l, this.y + l, this.x + k, this.y); //QUAD 4
		ctx.moveTo(this.x + k, this.y);
		ctx.closePath();
		//ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
			
	
   
    
}
import {ctx} from "./main.js"
export {Star};