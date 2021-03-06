class CircleForm{

	constructor(angle,spacing){
		this.startingAngle = angle;
		this.spacing = spacing;
	}
	//Draws the circle at a constant width but at different radiuses from the center circle.
	draw(ctx,data,radius, color){
		//Sets it up
		ctx.save();
        let barWidth = 3;
        let barHeight = 6;
		let previousPoint = {};
		let point = {};
		let angle = this.startingAngle;
		ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
		//Creates the color string
		ctx.strokeStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
		ctx.lineWidth = 3;
		ctx.beginPath();
		//Draws the circle
        for (let i = 0; i < data.length; i++) {
			point.x = Math.cos(angle)*(radius + this.spacing+data[i]*0.2);
			point.y = Math.sin(angle)*(radius + this.spacing+data[i]*0.2);
			angle += (Math.PI * 2/data.length/2);
            if(i == 0)
			{
				ctx.moveTo(point.x,point.y);
			}
			else
			{
				ctx.lineTo(point.x,point.y);
			}        
        }
		//Draws the second half
		for (let i = data.length-1; i >= 0; i--) {
			point.x = Math.cos(angle)*(radius + this.spacing+data[i]*0.2);
			point.y = Math.sin(angle)*(radius + this.spacing+data[i]*0.2);
			angle += (Math.PI * 2/data.length/2);
			ctx.lineTo(point.x,point.y);        
        }
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
	//Unused but was for drawing the circle at a constant radius but variable width
	drawWidth(ctx,data,radius,color){
		ctx.save();
        let barWidth = 3;
        let barHeight = 6;
		let previousPoint = {};
		let point = {};
		let angle = this.startingAngle;
		ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
		ctx.strokeStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
		ctx.lineWidth = 3;
		ctx.beginPath();
        for (let i = 0; i < data.length; i++) {
			point.x = Math.cos(angle)*(radius + this.spacing);
			point.y = Math.sin(angle)*(radius + this.spacing);
			angle += (Math.PI * 2/data.length);
            if(i == 0)
			{
				previousPoint.x = point.x;
				previousPoint.y = point.y;
				ctx.moveTo(point.x,point.y)
				continue;
			}
			else
			{
				ctx.lineTo(point.x,point.y);
				ctx.lineWidth = data[i]*0.2;
				ctx.stroke();
				
			}
			previousPoint.x = point.x;
			previousPoint.y = point.y;
        }
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

}
//Exports the class
export {CircleForm};