let audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // création du contexte audio
let keys = document.getElementsByClassName("keys"); // on récupère les notes
console.log(keys);
let wave = "sine";
function connect(osc) {
  console.log(wave);
  oscillator = audioCtx.createOscillator();
  distortion = audioCtx.createWaveShaper();
  noeudGain = audioCtx.createGain();
  oscillator.connect(noeudGain);
  distortion.connect(noeudGain);
  noeudGain.connect(audioCtx.destination);
  oscillator.type = osc; // onde sinusoïdale — les autres valeurs possible sont : 'square', 'sawtooth', 'triangle' et 'custom'
}

function start(evt) {
  console.log("test");
  console.log(evt);
  connect(wave);
  keys = evt.srcElement || evt.target;
  freq = Number(keys.getAttribute("data-freq"));
  oscillator.frequency.value = freq;
  oscillator.start();
  console.log(freq);

  color = [
    "#FF6F61",
    "#6B5B95",
    "#6B5B95",
    "#6B5B95",
    "#6B5B95",
    "#003366",
    "#003366",
    "#468499"
  ];
  document.getElementById("background").style.backgroundColor =
    color[Math.floor(Math.random() * color.length)];
}

const buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    wave = buttons[i].value;
  });
}

for (let i = 0; i < keys.length; i += 1) {
  console.log(keys[i]);
  keys[i].addEventListener("mousedown", start);
  keys[i].addEventListener("mouseup", stop);
}

function stop() {
  oscillator.stop();
}
