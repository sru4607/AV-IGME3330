let stars = [];
function initStars()
{
    let min = 5;
    let max = 25;
    for(let i = 0; i<20; i++)
    {
        stars[i] = new Star(Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*(max-min)+min);
    }
}
function updateStars(percent)
{
    for(let i = 0; i<stars.length;i++)
    {
        stars[i].draw(percent);
    }
}
function updateVisualization(data)
{
    if(stars.length == 0)
    {
        initStars();
    }
    let audioElement = document.querySelector("audio");
    if(!audioElement.paused)
    {
        
        let offScreenCtx = new OffscreenCanvas(1000,1).getContext("2d");
        let percentFinished  = audioElement.currentTime/audioElement.duration;
        
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        
        updateStars(percentFinished);
        //console.log(audioElement.duration);
        //console.log(audioElement.currentTime);
        let maxRadius = 250;
        let minRadius = 25;
        let startRadius = 100;

        let percentMax = 90;
        let percentMin = 93;

        let gradient = offScreenCtx.createLinearGradient(0,0,1000,0);
        gradient.addColorStop(0,"rgb(247,210,0)"); //Yellow
        gradient.addColorStop(.8,"rgb(247,27,0)"); //Red
        gradient.addColorStop(.9,"rgb(247,156,0)"); //Orange
        gradient.addColorStop(.91,"rgb(237,237,237)"); //White
        gradient.addColorStop(1,"rgb(117,253,255)"); //blue

        offScreenCtx.fillStyle = gradient;

        offScreenCtx.fillRect(0,0,1000,20);
        
        let pixel = Math.round(percentFinished*1000);
        let color = offScreenCtx.getImageData(pixel,0,1,1).data
        ctx.fillStyle = "rgb("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
        ctx.beginPath();
        ctx.arc(640,480,100,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        
        
        
    }
}

import {ctx} from "./main.js";
import {Star} from "./Star.js"
export {updateVisualization};