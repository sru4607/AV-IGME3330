

const NUM_SAMPLES = 256;

let highshelf = false;
let lowshelf = false;
let distortionAmount = 0;
let distortion = false;

// 1 - get reference to <audio> element on page
let audioElement = document.querySelector('audio');

// 2 - create a new `AudioContext` object
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
let audioCtx = new (window.AudioContext || window.webkitAudioContext); // to support Safari and mobile

// 3 - create a node that points at the <audio> element
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource
let sourceNode = audioCtx.createMediaElementSource(audioElement); 

// 4 - create a *analyser node*
// https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
// this gets us real-time frequency and time-domain (i.e. waveform) information
let analyserNode = audioCtx.createAnalyser();


// 5 - How many samples do we want? fft stands for Fast Fourier Transform
analyserNode.fftSize = NUM_SAMPLES;

let distortionFilter = audioCtx.createWaveShaper();

// 6 - hook up the <audio> element to the analyserNode
sourceNode.connect(analyserNode);


// 7 - connect to the destination i.e. the speakers
analyserNode.connect(distortionFilter);

    // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
let biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = "highshelf";

let lowShelfBiquadFilter = audioCtx.createBiquadFilter();
lowShelfBiquadFilter.type = "lowshelf";

distortionFilter.connect(biquadFilter);
biquadFilter.connect(lowShelfBiquadFilter);
lowShelfBiquadFilter.connect(audioCtx.destination);


 function setupUI(){
  document.querySelector('#highshelfCB').checked = highshelf;
  document.querySelector('#highshelfCB').onchange = e => {
    highshelf = e.target.checked;
    toggleHighshelf();
  };
  document.querySelector('#lowshelfCB').checked = lowshelf;
  document.querySelector('#lowshelfCB').onchange = e => {
    lowshelf = e.target.checked;
    toggleLowshelf();
  };
  document.querySelector('#distortionCB').checked = distortion;
  document.querySelector('#distortionCB').onchange = e => {
    distortion = e.target.checked;

  };
  document.querySelector('#distortionSlider').value = distortionAmount;
  document.querySelector('#distortionSlider').onchange = e => {
    distortionAmount = e.target.value;
    toggleDistortion();
  };
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
  if(distortion){
    distortionFilter.curve = null; // being paranoid and trying to trigger garbage collection
    distortionFilter.curve = makeDistortionCurve(distortionAmount);
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

export {setupUI,analyserNode};
