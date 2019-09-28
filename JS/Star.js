class Star{
    constructor(x,y,radius)
    {
        this.x = x;
        this.y = y;
        this.radius= radius;
        this.destroyed = 0;
        
    }
    
    draw(percent)
    {
        ctx.beginPath();
        ctx.color
        if(this.destroyed != 0 && this.destroyed < 5)
        {
            this.drawSparkles();
        }
        else if(this.destroyed == 0)
        {
            this.drawCircles();
            if((Math.random()*100.0) < percent)
                this.destroyed = 0.0000001;
        }
		else
			//Do nothing
			this.destroyed++;
    }
    drawCircles()
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
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
        
    }
}
import {ctx} from "./main.js"
export {Star};