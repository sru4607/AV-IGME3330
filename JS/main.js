// canvas stuff
let ctx = document.querySelector("canvas").getContext("2d");
const BAR_WIDTH = 30;
const MAX_BAR_HEIGHT = 100;
const PADDING = 4;
const MIDDLE_Y = ctx.canvas.height/2;
let controlValue = {
    tintRed: false,
    invert: false,
    noise: false,
    sepia: false,
	emboss: false,
	tintR:125,
	tintG:125,
	tingB:125,
    HighShelf: false,
    LowShelf: false,
    Distort: false,
    DistortionAmount: 50,
    song: "Peanut"   
};

function init(){
	//Sets the hamburger menu functionality - code from: https://www.cssscript.com/basic-hamburger-toggle-menu-css-vanilla-javascript/
	(function() {

		let hamburger = {
		ControlToggle: document.querySelector('.Control-toggle'),
		Control: document.querySelector('nav'),

		doToggle: function(e) {
			e.preventDefault();
			this.ControlToggle.classList.toggle('expanded');
			this.Control.classList.toggle('expanded');
			}
		};

		hamburger.ControlToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });
	}());
	//Sets the canvas element to be fullscreen
    document.querySelector("#FullScreenToggle").onclick = function(){
    if(document.fullscreenElement != null)
   	{
        document.exitFullscreen();
    }
    else
    {
       document.querySelector("canvas").requestFullscreen();
   }
   } 
	let inputs = document.querySelectorAll("input");
	let audioDropdown = document.querySelector("select");
	for(let i = 0; i<inputs.length; i++)
	{
		inputs[i].onchange = UpdateValue;
	}
	audioDropdown.onchange = UpdateValue;
	
	update();
}


function update() { 
  // 8 - this schedules a call to the update() method in 1/60 second
  requestAnimationFrame(update);
    
    //ctx.canvas.width = ctx.canvas.parentElement.width;
  // 9 - create a new array of 8-bit integers (0-255)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
  let data = new Uint8Array(audioNodes.analyserNode.frequencyBinCount); // OR analyserNode.fftSize/2

  // 10 - populate the array with the frequency data
  // notice these arrays are passed *by reference*
  audioNodes.analyserNode.getByteFrequencyData(data);

  updateVisualization(data, audioNodes.analyserNode.frequencyBinCount);
}
function manipulatePixels(ctx){
			
	let imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

	let data = imageData.data;
	let length = data.length;
	let width = imageData.width;

	let i;
	for(i = 0; i<length; i+=4){
		if(controlValue.tintRed){
			data[i] = data[i] + controlValue.tintR;
			data[i+1] = data[i+1] + controlValue.tintG;
			data[i+2] = data[i+2] + controlValue.tintB;
		}
		if(controlValue.invert)
		{
			let red = data[i],green = data[i+1],blue = data[i+2];
			data[i] = 255-red;
			data[i+1] = 255-green;
			data[i+2] = 255-blue;
		}
		if(controlValue.noise && Math.random() < 0.10)
		{
			data[i] = data[i+1] = data[i+2] = 128;
			data[i+3] = 255;
		}
		if(controlValue.sepia){
			let red = data[i],green = data[i+1],blue = data[i+2];
			data[i] = Math.min(255,(0.393*red)+(0.768*green)+(0.189*blue));
			data[i+1] = Math.min(255,(0.349*red)+(0.686*green)+(0.168*blue));
			data[i+2] = Math.min(255,(0.272*red)+(0.534*green)+(0.131*blue));

		}
	}
	if(controlValue.emboss)
	{
		for(i = 0; i<data.length;i++)
		{
			if(i%3==0) continue;
			data[i] = 127+2*data[i] - data[i+4] - data[i+width*4];
		}
	}

	ctx.putImageData(imageData,0,0);
			
}

function UpdateValue(e){
	console.log(e);
	if(e.target.type == "radio"){
		if(e.target.name=="AudioEffect"){
			if(e.target.value == "High")
			{
				//Disable All
				controlValue.Distort = false;
				controlValue.LowShelf = false;
				//Enable High
				controlValue.HighShelf = true;
				toggleDistortion();
				toggleHighshelf();
				toggleLowshelf();
			}
			if(e.target.value == "Low")
			{
				//Disable All
				controlValue.Distort = false;
				controlValue.HighShelf = false;
				//Enable Low
				controlValue.LowShelf = true;
				toggleDistortion();
				toggleHighshelf();
				toggleLowshelf();
			}
			if(e.target.value == "ValDistort")
			{
				//Disable All
				controlValue.LowShelf = false;
				controlValue.HighShelf = false;
				//Enable Low
				controlValue.Distort = true;
				toggleDistortion();
				toggleHighshelf();
				toggleLowshelf();
			}
			if(e.target.value == "off")
			{
				//Disable All
				controlValue.LowShelf = false;
				controlValue.HighShelf = false;
				controlValue.Distort = false;
				toggleDistortion();
				toggleHighshelf();
				toggleLowshelf();
			}
		}
	}
	if(e.target.type == "checkbox"){
		if(e.target.name=="VizFX"){
			if(e.target.value =="Tint"){
				controlValue.tintRed = e.target.checked;
			}
			if(e.target.value =="Noise"){
				controlValue.noise = e.target.checked;
			}
			if(e.target.value =="Sepia"){
				controlValue.sepia = e.target.checked;
			}
			if(e.target.value =="Invert"){
				controlValue.invert = e.target.checked;
			}
			if(e.target.value =="Emboss"){
				controlValue.emboss = e.target.checked;
			}
		}
	}
	if(e.target.tagName == "SELECT"){
		document.querySelector("audio").src = e.target.value;
		document.querySelector("audio").load();
	}
	if(e.target.type=="range"){
		if(e.target.id =="starColorR")
		{
			controlValue.tintR = parseInt(e.target.value);
			e.target.nextElementSibling.innerHTML = controlValue.tintR;
		}
		if(e.target.id =="starColorG")
		{
			controlValue.tintG = parseInt(e.target.value);
			e.target.nextElementSibling.innerHTML = controlValue.tintG;
		}
		if(e.target.id =="starColorB")
		{
			controlValue.tintB = parseInt(e.target.value);
			e.target.nextElementSibling.innerHTML = controlValue.tintB;
		}
		if(e.target.id="distortSlider"){
			controlValue.DistortionAmount = parseInt(e.target.value);
			e.target.nextElementSibling.innerHTML = controlValue.DistortionAmount;
			toggleDistortion();
		}
	}
		
}

import {audioNodes,toggleDistortion,toggleLowshelf,toggleHighshelf} from './AudioControl.js';
import {updateVisualization, Reset} from './VisualModifier.js';
export {controlValue, ctx, init, manipulatePixels};