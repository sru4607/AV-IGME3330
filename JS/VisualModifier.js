let stars = [];
let circleForms = [];
let percentFinished = 0;
//Initializes the stars
function initStars() {
    let min = 3;
    let max = 10;
    let count = Math.round(Math.random() * 250);
    for (let i = 0; i < count; i++) {
        stars[i] = new Star(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, Math.random() * (max - min) + min);
        //stars[i] = new Star(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height,5);
    }
}
//Initializaes the circles around the center sun
function initCircles() {
    circleForms[0] = new CircleForm(0,100);
	circleForms[1] = new CircleForm(Math.PI/2,20);
	circleForms[2] = new CircleForm(Math.PI,35);
	circleForms[3] = new CircleForm(3*Math.PI/2,50);
}
//Updates the circles around the center sun
function updateCircleForms(data,radius,color){

	for(let i = 0; i<circleForms.length; i++)
	{
		circleForms[i].draw(ctx,data,radius,color)
	}
}
//Updates the stars
function updateStars(percent, data) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw(percent,data);       
    }
}
//Updates what is being drawn to the canvas
function updateVisualization(data , integerVal) {
    if (stars.length == 0) {
        initStars();
    }
	if (circleForms.length == 0) {
        initCircles();
    }
    let audioElement = document.querySelector("audio");
    if (!audioElement.paused) 
	{
        let offScreenCtx = new OffscreenCanvas(1000, 1).getContext("2d");
       
        percentFinished = audioElement.currentTime / audioElement.duration;;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(imageBack,0,0);
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
        let color = offScreenCtx.getImageData(pixel, 0, 1, 1).data;

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
        //draw main circle
        ctx.save();
        let colorString = "rgb(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")"; //creates a color string for corresponding color
        let grd = ctx.createRadialGradient(ctx.canvas.width/2, ctx.canvas.height/2, radius, 90, 60, 100); //create gradient (needs tweaking)
        //color stops
        grd.addColorStop(0, colorString);
        grd.addColorStop(1, "white");
        //
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
       	updateCircleForms(data,radius,color);

		//Waveform
		ctx.moveTo(10,ctx.canvas.height-10);
		let toMove = (ctx.canvas.width-20)/integerVal;
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
        
		ctx.beginPath();
		ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.closePath();
		ctx.strokeStyle = colorString;
		ctx.lineWidth = 10;
		ctx.stroke();
		//Image manipulation
        manipulatePixels(ctx);

    }
}
//Resets the visualization for a new song to play
function reset(){
    stars = [];
    circleForms = [];
    percentFinished = 0;
}

import { ctx, manipulatePixels} from "./main.js";
import { Star } from "./Star.js"
import {CircleForm} from "./CircleForm.js"
import {imageBack} from "./Loader.js";
export { updateVisualization, reset };