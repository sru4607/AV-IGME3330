// canvas stuff
let ctx = document.querySelector("canvas").getContext("2d");
const BAR_WIDTH = 30;
const MAX_BAR_HEIGHT = 100;
const PADDING = 4;
const MIDDLE_Y = ctx.canvas.height/2;
let tintRed;
let invert;
let noise;
let sepia;

setupUI();
setupUIBoxes();
update();




function update() { 
  // 8 - this schedules a call to the update() method in 1/60 second
  requestAnimationFrame(update);
  // 9 - create a new array of 8-bit integers (0-255)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
  let data = new Uint8Array(analyserNode.frequencyBinCount); // OR analyserNode.fftSize/2

  // 10 - populate the array with the frequency data
  // notice these arrays are passed *by reference*
  analyserNode.getByteFrequencyData(data);

  updateVisualization(data);
  manipulatePixels(ctx);
}
function setupUIBoxes(){
			document.querySelector('#tintCB').checked = tintRed;
			document.querySelector('#invertCB').checked = invert;
			document.querySelector('#noiseCB').checked = noise;
			document.querySelector('#sepiaCB').checked = sepia;

			
			document.querySelector('#tintCB').onchange = e => tintRed = e.target.checked;
			document.querySelector('#invertCB').onchange = e => invert = e.target.checked;
			document.querySelector('#noiseCB').onchange = e => noise = e.target.checked;
			document.querySelector('#sepiaCB').onchange = e => sepia = e.target.checked;

}

function manipulatePixels(ctx){
			
	let imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

	let data = imageData.data;
	let length = data.length;
	let width = imageData.width;

	let i;
	for(i = 0; i<length; i+=4){
		if(tintRed){
			data[i] = data[i] + 100;
		}
		if(invert)
		{
			let red = data[i],green = data[i+1],blue = data[i+2];
			data[i] = 255-red;
			data[i+1] = 255-green;
			data[i+2] = 255-blue;
		}
		if(noise && Math.random() < 0.10)
		{
			data[i] = data[i+1] = data[i+2] = 128;
			data[i+3] = 255;
		}
		if(sepia){
			let red = data[i],green = data[i+1],blue = data[i+2];
			data[i] = Math.min(255,(0.393*red)+(0.768*green)+(0.189*blue));
			data[i+1] = Math.min(255,(0.349*red)+(0.686*green)+(0.168*blue));
			data[i+2] = Math.min(255,(0.272*red)+(0.534*green)+(0.131*blue));

		}
	}

	ctx.putImageData(imageData,0,0);
			
}
import {setupUI,analyserNode} from './AudioControl.js';
import {updateVisualization} from './VisualModifier.js';
export {ctx};