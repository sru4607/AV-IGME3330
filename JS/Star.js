class Star{
    constructor(x,y,radius)
    {
        this.x = x;
        this.y = y;
        this.radius= radius;
        this.destroyed = false;
        
    }
    
    draw(percent)
    {
        ctx.beginPath();
        ctx.color
        if(this.destroyed != false && this.destroyed < 5)
        {
            this.drawSparkles();
        }
        else
        {
            this.drawCircles();
            if(Math.random() < percent)
                this.destroyed = 0;
        }
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
        let sparkleRadius = radius*2;
        let sparkleCount = Math.round(this.radius/20);
        ctx.fillStyle = "white";
        let i;
        for(i =0;i<sparkleCount;i++){
            ctx.beginPath();
            let xOffset = Math.cos(angle)*sparkleRadius*Math;
            vector[1] = Math.sin(angle)*sparkleRadius;
            let xOffSet = sparkleRadius*(Math.random()-0.5);
            let yOffSet = sparkleRadius*(Math.random()-0.5);
            ctx.arc(this.x+xOffset,this.y+yOffSet,this.radius/10,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        
    }
}
import {ctx} from "./main.js"
export {Star};