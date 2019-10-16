const NUM_SAMPLES = 256;
let audioNodes = {};
audioSetUp();
function audioSetUp(){
// 1 - get reference to <audio> element on page
let audioElement = document.querySelector('audio');

// 2 - create a new `AudioContext` object
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
let audioCtx = new (window.AudioContext || window.webkitAudioContext); // to support Safari and mobile
audioNodes.context = audioCtx;
// 3 - create a node that points at the <audio> element
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource
audioNodes.sourceNode = audioCtx.createMediaElementSource(audioElement); 

// 4 - create a *analyser node*
// https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
// this gets us real-time frequency and time-domain (i.e. waveform) information
audioNodes.analyserNode = audioCtx.createAnalyser();


// 5 - How many samples do we want? fft stands for Fast Fourier Transform
audioNodes.analyserNode.fftSize = NUM_SAMPLES;

audioNodes.distortionFilter = audioCtx.createWaveShaper();

// 6 - hook up the <audio> element to the analyserNode
audioNodes.sourceNode.connect(audioNodes.analyserNode);


// 7 - connect to the destination i.e. the speakers
audioNodes.analyserNode.connect(audioNodes.distortionFilter);

    // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
	
//Sets up the various filters and distortion effects
audioNodes.biquadFilter = audioCtx.createBiquadFilter();
audioNodes.biquadFilter.type = "highshelf";

audioNodes.lowShelfBiquadFilter = audioCtx.createBiquadFilter();
audioNodes.lowShelfBiquadFilter.type = "lowshelf";

audioNodes.distortionFilter.connect(audioNodes.biquadFilter);
audioNodes.biquadFilter.connect(audioNodes.lowShelfBiquadFilter);
audioNodes.lowShelfBiquadFilter.connect(audioCtx.destination);
//Set the audio element to resume once the user interacts with it
document.querySelector("audio").onplay = startAudio;
}
function startAudio(){
    audioNodes.context.resume();
	
}
//Toggle highself based on the control value
function toggleHighshelf(){

  if(controlValue.HighShelf){
    audioNodes.biquadFilter.frequency.setValueAtTime(1000, audioNodes.context.currentTime);
   audioNodes.biquadFilter.gain.setValueAtTime(25, audioNodes.context.currentTime);
  }else{
    audioNodes.biquadFilter.gain.setValueAtTime(0, audioNodes.context.currentTime);
  }
}
//Toggles lowshelf based on the control value
function toggleLowshelf(){
  if(controlValue.LowShelf){
    audioNodes.lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioNodes.context.currentTime);
    audioNodes.lowShelfBiquadFilter.gain.setValueAtTime(15, audioNodes.context.currentTime);
  }else{
    audioNodes.lowShelfBiquadFilter.gain.setValueAtTime(0, audioNodes.context.currentTime);
  }
}
//Toggles distortion based on the control value and distortion amount
function toggleDistortion(){
  if(controlValue.Distort){
    audioNodes.distortionFilter.curve = null; // being paranoid and trying to trigger garbage collection
    audioNodes.distortionFilter.curve = makeDistortionCurve(controlValue.DistortionAmount);
  }else{
    audioNodes.distortionFilter.curve = null;
  }
}
// from: https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
function makeDistortionCurve(amount=20) {
  let n_samples = 256, curve = new Float32Array(n_samples);
  for (let i =0 ; i < n_samples; ++i ) {
    let x = i * 2 / n_samples - 1;
    curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
//IMports and exports
import {controlValue} from "./main.js"
export {audioNodes,toggleDistortion,toggleHighshelf,toggleLowshelf};
