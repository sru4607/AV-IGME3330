// canvas stuff
let ctx = document.querySelector("canvas").getContext("2d");
const BAR_WIDTH = 30;
const MAX_BAR_HEIGHT = 100;
const PADDING = 4;
const MIDDLE_Y = ctx.canvas.height/2;


setupUI();

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

}

import {setupUI,analyserNode} from './AudioControl.js';
import {updateVisualization} from './VisualModifier.js';
export {ctx};