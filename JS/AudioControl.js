const NUM_SAMPLES = 256;
let audioNodes = {};
audioSetUp();
function audioSetUp(){
// 1 - get reference to <audio> element on page
let audioElement = document.querySelector('audio');

// 2 - create a new `AudioContext` object
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
let audioCtx = new (window.AudioContext || window.webkitAudioContext); // to support Safari and mobile

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
audioNodes.biquadFilter = audioCtx.createBiquadFilter();
audioNodes.biquadFilter.type = "highshelf";

audioNodes.lowShelfBiquadFilter = audioCtx.createBiquadFilter();
audioNodes.lowShelfBiquadFilter.type = "lowshelf";

audioNodes.distortionFilter.connect(audioNodes.biquadFilter);
audioNodes.biquadFilter.connect(audioNodes.lowShelfBiquadFilter);
audioNodes.lowShelfBiquadFilter.connect(audioCtx.destination);

}
function setupUI(){
     guiControllers.High.onChange = toggleHighshelf;
     guiControllers.Low.onChange = toggleLowshelf;
     guiControllers.Distort.onChange = toggleDistortion;
     guiControllers.DistortionAmount.onChange = toggleDistortion;
}
function toggleHighshelf(){
  if(highshelf){
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
  }else{
    biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
  }
}
function toggleLowshelf(){
  if(lowshelf){
    lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    lowShelfBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
  }else{
    lowShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
  }
}
function toggleDistortion(){
  if(controlValue.Distort){
    distortionFilter.curve = null; // being paranoid and trying to trigger garbage collection
    distortionFilter.curve = makeDistortionCurve(controlValue.DistortionAmount);
  }else{
    distortionFilter.curve = null;
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
import {guiControllers, controlValue} from "./main.js"
export {setupUI,audioNodes};
