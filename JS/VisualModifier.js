let stars = [];
let circleForms = [];
function initStars() {
    let min = 3;
    let max = 10;
    let count = Math.round(Math.random() * 250);
    for (let i = 0; i < count; i++) {
        stars[i] = new Star(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, Math.random() * (max - min) + min);
    }
}
function initCircles() {
    circleForms[0] = new CircleForm(0,100);
	circleForms[1] = new CircleForm(Math.PI/2,20);
	circleForms[2] = new CircleForm(Math.PI,35);
	circleForms[3] = new CircleForm(3*Math.PI/2,50);
}
function updateCircleForms(data,radius,color)
{
	if(circleForms.length >= 1)
	{
		circleForms[0].drawWidth(ctx,data,radius,color);
	}
	for(let i = 0; i<circleForms.length; i++)
	{
		circleForms[i].draw(ctx,data,radius,color)
	}
}
function updateStars(percent, data) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw(percent);
        if(!stars[i].toBeDestroyed){
            stars[i].drawRectangles(data);
        }
       
    }
}
function updateVisualization(data) {
    if (stars.length == 0) {
        initStars();
    }
	if (circleForms.length == 0) {
        initCircles();
    }
    let audioElement = document.querySelector("audio");
    if (!audioElement.paused) {

        let offScreenCtx = new OffscreenCanvas(1000, 1).getContext("2d");
        let percentFinished = audioElement.currentTime / audioElement.duration;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        updateStars(percentFinished, data);
        //console.log(audioElement.duration);
        //console.log(audioElement.currentTime);
        let maxRadius = 250;
        let minRadius = 25;
        let startRadius = 100;

        let percentMax = 90;
        let percentMin = 93;

        let gradient = offScreenCtx.createLinearGradient(0, 0, 1000, 0);
        gradient.addColorStop(0, "rgb(247,210,0)"); //Yellow
        gradient.addColorStop(.8, "rgb(247,27,0)"); //Red
        gradient.addColorStop(.9, "rgb(247,156,0)"); //Orange
        gradient.addColorStop(.91, "rgb(237,237,237)"); //White
        gradient.addColorStop(.925, "rgb(150,200,255)"); //blue

        offScreenCtx.fillStyle = gradient;

        offScreenCtx.fillRect(0, 0, 1000, 20);

        let pixel = Math.round(percentFinished * 1000);
        let color = offScreenCtx.getImageData(pixel, 0, 1, 1).data

        let radius = 100;
        if (percentFinished < .8) {
            radius = startRadius + (maxRadius - startRadius) * (1.25) * percentFinished;
        }
        else if (percentFinished < .9) {
            radius = maxRadius - ((maxRadius - minRadius) * 10 * (percentFinished - 0.8));
        }
        else {
            radius = minRadius * (1 + ((percentFinished - .9) * 500));
        }

        ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
        ctx.beginPath();
        ctx.arc(640, 480, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

       	updateCircleForms(data,radius,color);

		
		ctx.moveTo(10,ctx.canvas.height-10);
		let toMove = (ctx.canvas.width-20)/data.length;
		ctx.beginPath();
		for(let d = 0; d<data.length; d++)
		{
			ctx.lineTo(10+toMove*d,ctx.canvas.height-20-data[d]);
		}
		ctx.stroke();
		ctx.lineTo(ctx.canvas.width-10,ctx.canvas.height-10);
		ctx.lineTo(10,ctx.canvas.height - 10);
		ctx.closePath();
		ctx.fill();

    }
}


import { ctx } from "./main.js";
import { Star } from "./Star.js"
import {CircleForm} from "./CircleForm.js"
export { updateVisualization };