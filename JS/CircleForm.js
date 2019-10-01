class CircleForm{

	constructor(angle,spacing){
		this.startingAngle = angle;
		this.spacing = spacing;
	}
	draw(ctx,data,radius, color){
			
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
        for (var i = 0; i < data.length; i++) {
			point.x = Math.cos(angle)*(radius + this.spacing+data[i]*0.2);
			point.y = Math.sin(angle)*(radius + this.spacing+data[i]*0.2);
			angle += (Math.PI * 2/data.length);
            if(i == 0)
			{
				ctx.moveTo(point.x,point.y);
			}
			else
			{
				ctx.lineTo(point.x,point.y);
			}        
        }
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
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
        for (var i = 0; i < data.length; i++) {
			point.x = Math.cos(angle)*(radius + this.spacing+data[i]*0.2);
			point.y = Math.sin(angle)*(radius + this.spacing+data[i]*0.2);
			angle += (Math.PI * 2/data.length);
            if(i == 0)
			{
				previousPoint = point;
				continue;
			}
			else
			{
				ctx.moveTo(previousPoint.x,previousPoint.y)
				ctx.lineTo(point.x,point.y);
				ctx.lineWidth = data[i]*0.2;
				ctx.stroke();
				ctx.closePath();
			}
			previousPoint = point;
        }
		ctx.restore();
	}

}
export {CircleForm};