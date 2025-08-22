// ===========================================INTRO/OUTRO SOUNDS==============================

// sound to play when user clicks on "DRUM 🥁 KIT" title
document.querySelector("#title").addEventListener("click", introBit)

function introBit() {
    var introAudio = new Audio("assets/sounds/intro_bit.wav");
    introAudio.play();

}



// sound to play when user clicks on "Rockstar Baby" img
document.querySelector("#Z").addEventListener("click", zapBit)

function zapBit() {
    var zapAudio = new Audio("assets/sounds/outro_bit.wav");
    zapAudio.play();

}




// sound to play when user clicks on "written by AB⚡CD" band footer
document.querySelector(".band").addEventListener("click", outroBit)

function outroBit() {
    var outroAudio = new Audio("assets/sounds/zap.wav");
    outroAudio.play();

}

// ===========================================INTRO/OUTRO SOUNDS END=======================
//=============================================FUN STUFF=================================
function createSpark(x, y, color = 'white') {
  const spark = document.createElement("div");
  spark.className = "spark";
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.setProperty('--spark-color', color);
  document.body.appendChild(spark);

  // Auto-remove
  setTimeout(() => spark.remove(), 1000);
}


function screenShake() {
  const container = document.querySelector(".frame-wrap");
  container.style.transition = "transform 0.2s";
  container.style.transform = "translateX(5px)";
  setTimeout(() => container.style.transform = "translateX(-5px)", 50);
  setTimeout(() => container.style.transform = "translateX(0px)", 100);
}


function createNeonSparks(x, y) {
  const colors = [
    "#ff004c", "#0fffc1", "#00b7ff",
    "#fffb00", "#ff00e1", "#39ff14", "#ffa600"
  ];

  const numSparks = 120;
  const wave = document.createElement("div");
    wave.className = "shockwave";
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 600);


  for (let i = 0; i < numSparks; i++) {
    const spark = document.createElement("div");
    spark.className = "mini-spark";

    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.setProperty("--spark-color", color);

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    // Add random angle and speed
    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 200; // explosion distance
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.setProperty("--dx", `${dx}px`);
    spark.style.setProperty("--dy", `${dy}px`);


    const size = Math.random() * 3 + 1.5; // 1.5px to 4.5px
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

function flashGlitch() {
  const body = document.body;
  body.classList.add("glitch-flash");
  setTimeout(() => body.classList.remove("glitch-flash"), 100);
}

function huePulse() {
  const body = document.body;
  body.classList.add("hue-pulse");
  setTimeout(() => body.classList.remove("hue-pulse"), 700);
}

function radialBlast(x, y) {
  const blast = document.createElement("div");
  blast.className = "radial-blast";
  blast.style.left = `${x}px`;
  blast.style.top = `${y}px`;
  document.body.appendChild(blast);
  setTimeout(() => blast.remove(), 700);
}

function applyRandomFX(x, y) {
  const fx = [
  () => createNeonSparks(x, y),
  () => neonExplosion(x, y),
  () => screenShake(),

  () => radialBlast(x, y),
  () => cyberGridFlash(),
  () => shockwaveRing(x, y),
  () => ghostPulse(),
 
  () => bioScanEffect(x, y),
  () => orbitalRings(x, y),
  () => nanoMistBurst(x, y)
];


  const shuffled = fx.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < count; i++) {
    shuffled[i]();
  }

  // always drop extra sparks
  for (let j = 0; j < 6; j++) {
    let offsetX = (Math.random() - 0.5) * 80;
    let offsetY = (Math.random() - 0.5) * 80;
    createSpark(x + offsetX, y + offsetY);
  }
}


function neonExplosion(x, y) {
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement("div");
    piece.className = "neon-shard";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);

    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 150;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    piece.animate([
      { transform: `translate(0, 0) rotate(${Math.random() * 360}deg)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 400,
      easing: "ease-out"
    });

    setTimeout(() => piece.remove(), 1200);
  }
}

function cyberGridFlash() {
  const grid = document.createElement("div");
  grid.className = "cyber-grid";
  document.body.appendChild(grid);
  setTimeout(() => grid.remove(), 600);
}

function shockwaveRing(x, y) {
  const ring = document.createElement("div");
  ring.className = "shockwave-ring";
  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;
  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 600);
}

function ghostPulse() {
  document.body.classList.add("ghost-pulse");
  setTimeout(() => document.body.classList.remove("ghost-pulse"), 500);
}

function neuroNetPulse(x, y) {
  const net = document.createElement("canvas");
  net.width = 200;
  net.height = 200;
  net.className = "neural-net";
  net.style.left = `${x - 100}px`;
  net.style.top = `${y - 100}px`;
  const ctx = net.getContext("2d");
  document.body.appendChild(net);

  const nodes = [];
  for (let i = 0; i < 20; i++) {
    nodes.push({
      x: Math.random() * 200,
      y: Math.random() * 200,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }

  nodes.forEach((n1, i) => {
    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j];
      const dx = n1.x - n2.x;
      const dy = n1.y - n2.y;
      if (Math.sqrt(dx * dx + dy * dy) < 80) {
        ctx.strokeStyle = n1.color;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }
  });

  setTimeout(() => net.remove(), 700);
}

function bioScanEffect(x, y) {
  const scan = document.createElement("div");
  scan.className = "bio-scan";
  scan.style.left = `${x}px`;
  scan.style.top = `${y}px`;
  document.body.appendChild(scan);

  setTimeout(() => scan.remove(), 1000);
}


function orbitalRings(x, y) {
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement("div");
    ring.className = "orbital-ring";
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.animationDelay = `${i * 0.15}s`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 1000);
  }
}

function nanoMistBurst(x, y) {
  for (let i = 0; i < 50; i++) {
    const mist = document.createElement("div");
    mist.className = "nano-dot";
    mist.style.left = `${x}px`;
    mist.style.top = `${y}px`;
    mist.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
    document.body.appendChild(mist);

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    mist.animate([
      { transform: `translate(0, 0)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
      duration: 600,
      easing: "ease-out"
    });

    setTimeout(() => mist.remove(), 800);
  }
}



//============================================FUN STUFF END=================================


const keySoundMap = {
  'w': 'crash.mp3',
  'a': 'kick-bass.mp3',
  's': 'snare.mp3',
  'd': 'tom-1.mp3',
  'j': 'tom-2.mp3',
  'k': 'tom-3.mp3',
  'l': 'tom-4.mp3'
};

// Button click events
document.querySelectorAll(".drum").forEach(button => {
  button.addEventListener("click", function () {
    const key = this.innerText.toLowerCase();
    playDrumSound(key, this);
  });
});

// Keydown events
document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  const button = document.querySelector(`.${key}`);
  if (keySoundMap[key] && button) {
    playDrumSound(key, button);
    // Optional: visual key press feedback
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
  }
});

// Central function
function playDrumSound(key, buttonEl) {
  const soundFile = keySoundMap[key];
  if (soundFile) {
    const audio = new Audio(`assets/sounds/${soundFile}`);
    audio.play();

    // FX position
    const rect = buttonEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    applyRandomFX(x, y);
  }
}


//=====================================================================================

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




const grooveLibrary = {
  // ========== ROCK & PUNK ==========
  adtrVerse: [["j", "a"], ["j"], ["j", "s"], ["j"], ["j", "a"], ["j"], ["j", "s"], ["j"]],
  punkRock: [["j", "a"], ["j", "s"], ["j", "a"], ["j", "s"], ["j", "a", "a"], ["j"], ["j", "s"], ["j"]],
  halftimeStomp: [["j", "a"], ["j"], ["j", "s"], [], ["j", "a"], ["j"], ["j", "s"], ["z"]],
  tomGroove: [["w", "a"], ["d"], ["l", "s"], [], ["a", "d"], ["w", "s"], ["l"], []],
  rideGroove: [["j", "a"], ["j"], ["j", "s"], ["j"], ["j", "a"], ["j"], ["j", "s"], ["j"]],

  // ========== METAL ==========
  gallopRock: [["a"], ["a", "a"], ["s"], [], ["a"], ["a"], ["s", "j"], []],
  metalDrive: [["a"], ["s"], ["a"], ["s"], ["a", "a"], ["s", "s"], ["a"], ["s", "j"]],
  
  // ========== FUNK ==========
  linearFunk: [["a"], ["j"], ["s"], ["d"], ["a"], ["j"], ["s"], ["w"]],
  pocketFunk: [["j", "a"], ["s"], [], ["j", "a"], ["j"], ["s"], ["d"], []],

  // ========== HIP HOP ==========
  boomBap1: [["a", "s"], [], ["j"], ["s"], ["a", "s"], [], ["j"], ["s"]],
  boomBap2: [["a"], ["s"], ["j", "a"], [], ["a"], [], ["j", "s"], []],
  loFiChill: [["j"], ["s"], [], ["a"], ["j"], ["s"], [], ["d"]],
  trapMinimal: [["a"], [], ["a", "a"], [], ["s"], [], ["j", "s"], []],
  trapBounce: [["a"], ["a", "a"], ["s", "j"], [], ["a"], [], ["j", "s"], []],

  // ========== R&B / NEO-SOUL ==========
  rnbSwing: [["j"], ["s"], ["a"], ["j"], ["j"], ["s"], ["a"], ["d"]],
  neoSoulGroove: [["j"], [], ["a", "s"], ["d"], [], ["j"], ["s"], ["d"]],
  slowJam: [["s"], [], ["a"], ["j"], [], ["s", "a"], ["d"], []],
  rnbPocket: [["j", "a"], [], ["s"], [], ["j"], [], ["s"], []],

  // ========== HOUSE / ELECTRONIC ==========
  houseBasic: [["a"], [], ["a"], [], ["a"], [], ["a"], []],
  deepHouse: [["a"], [], ["a", "s"], ["j"], ["a"], [], ["s", "j"], []],
  garageShuffle: [["a"], ["j"], [], ["a", "s"], ["a"], [], ["s", "j"], []],
  edmBuild: [["j"], ["j", "a"], ["j", "s"], ["j", "a"], ["j"], ["j", "a"], ["j", "s"], ["w"]],

  // ========== WORLD / LATIN ==========
  afroBeatPulse: [["a"], [], ["s", "d"], [], ["j", "s"], [], ["a"], []],
  reggaetonBasic: [["a", "s"], ["s"], ["a"], [], ["a", "s"], [], ["j"], []],
  sambaBounce: [["a"], ["s"], ["j", "a"], [], ["a"], ["s", "d"], ["j"], []],

  // ========== FILLS ==========
  fillBasic: [["w"], ["a"], ["d"], ["s"], ["a"], ["d"], ["l"], ["j"]],
  fillHeavy: [["k", "k"], ["a", "s"], ["d"], ["l"], ["w"], ["a", "a"], ["s", "s"], ["j"]],
  snareRattle: [["s"], ["s"], ["s"], ["s"], ["s", "d"], ["s"], ["s"], ["s"]],
  tomRoll: [["d"], ["d", "l"], ["l"], ["l", "k"], ["k"], ["k"], ["w"], ["j"]],
  dropCrush: [["w"], ["s", "a"], ["j"], ["d"], ["l"], ["k", "k"], ["a", "a"], ["z"]],
  reverseOutro: [["z"], [], ["l"], ["k"], ["d"], ["a"], ["w"], []],
  
  // ========== EXPERIMENTAL ==========
  ghostGroove: [["s"], [], ["s"], [], ["a", "s"], [], ["s"], []],
  silencePulse: [[], [], ["a"], [], [], ["s"], [], []],
  cyberSwing: [["j", "w"], [], ["a", "s"], ["d"], ["j"], [], ["s"], ["a"]],

  classicRnB: [
    ["j"],  // soft hi-hat
    ["a"],  // gentle kick
    ["j", "s"],  // hi-hat + snare
    ["j"],  
    ["a"],  
    ["j", "s"],  
    ["j"],  
    ["a"]
  ],

  amenBreakInspired: [
    ["a"], ["s"], ["a", "j"], ["s"], 
    ["a"], ["s", "j"], ["a"], ["s"]
  ],

  rosannaShuffle: [
    ["j"], ["j"], ["j", "s"], ["j"],
    ["j"], ["j", "s"], ["j"], ["j"]
  ],

  oneDrop: [
    [], [], ["a", "s"], [], 
    [], [], ["a", "s"], []
  ],

  danceFloor: [
    ["a"], ["a"], ["a"], ["a"],
    ["a"], ["a"], ["a"], ["a"]
  ],

  rosannaShuffle: [
    ["j"], ["j", "s"], ["j"], ["a", "s"],
    ["j"], ["j", "s"], ["j"], ["a", "s"]
  ],

  useMeFunkPocket: [
    ["a"], ["s"], ["a", "j"], ["s"],
    ["a"], ["s", "j"], ["a"], ["s"]
  ],

  waitingOnWorld: [
    ["j", "a"], ["s"], ["j", "a"], ["s"],
    ["j", "a"], ["s"], ["j", "a"], ["s"]
  ],

   dillaSwing: [
    ["j"], ["a"], ["j", "s"], ["j"],
    ["a"], ["j", "s"], ["j"], ["a", "s"]
  ],

  // Classic Boom-Bap groove (Pete Rock / 9th Wonder style)
  boomBapClassic: [
    ["a"], [], ["s"], ["j"],
    ["a"], [], ["s"], ["j"]
  ],

  // Jazz-inflected rap groove (Cl Smooth / Pete Rock)
  jazzRapGroove: [
    ["j"], ["a"], ["j", "s"], [],
    ["a"], ["j"], ["s"], ["d"]
  ],

    dillaTimeGroove: [
    ["j"], ["a"], ["j", "s"], ["j"],
    ["a", "j"], ["j", "s"], ["j"], ["a", "s"]
  ],

  //  Classic boom bap (Pete Rock / 9th Wonder)
  boomBapClassicV2: [
    ["j", "a"], [], ["j", "s"], ["j"],
    ["j", "a"], [], ["j", "s"], ["j"]
  ],

  //  Jazz rap pocket (T.R.O.Y. style)
  troyGroove: [
    ["j"], ["a"], ["j", "s"], ["j"],
    ["a"], ["j"], ["s", "d"], []
  ],

//  Lo-Fi Trip-Hop fall-in groove
loFiTripHop: [
  ["j"], [], ["a"], ["j", "s"],
  [], ["a"], ["j"], ["d"]
],

// Kendrick Lamar - DNA groove
kendrickDNA: [
  ["j", "a"], // kick + hi-hat
  ["j"],      // hi-hat
  ["j", "s"], // hi-hat + snare
  ["j"],
  ["a"],      // extra kick emphasis
  ["j"],      // hi-hat
  ["j", "s"], // repeat
  ["j"]
],

// Kendrick Lamar - HUMBLE groove
kendrickHUMBLE: [
  ["a"],         // kick
  ["j", "a"],    // hi-hat with kick
  ["j", "s"],    // hi-hat + snare
  ["j"],
  ["a"],         
  ["j", "s"],    
  ["j", "a"],    
  ["j"]
],

// Amen break classic
amenClassic: [
  ["a"], ["s"], ["a", "j"], ["s"],
  ["a"], ["s", "j"], ["a"], ["s"]
],

beastieFight: [
  ["a"], ["s"], ["a", "j"], ["s"],
  ["a"], ["s", "j"], ["a"], ["s"]
],

};









function startVariantJam() {
  const grooveKeys = Object.keys(grooveLibrary);
  const pick = key => grooveLibrary[key];

  const session = [
    ...pick(grooveKeys[random(0, grooveKeys.length - 1)
]),         // intro groove
    ...pick(grooveKeys[random(0, grooveKeys.length - 1)
]),         // second groove
    ...grooveLibrary["fillBasic"],             // basic fill
    ...pick(grooveKeys[random(0, grooveKeys.length - 1)
]),         // groove 3
    ...grooveLibrary["fillHeavy"],             // big finish
  ];

  let index = 0;
  const bpm = 90 + Math.floor(Math.random() * 40); // random BPM 90–130
  const interval = (60 / bpm) * 1000 / 2;

  const btn = document.getElementById("AI");
  btn.disabled = true;
  btn.innerText = "⚡ AI JAMMING...";

  const loop = setInterval(() => {
    if (index >= session.length) {
      clearInterval(loop);
      btn.disabled = false;
      btn.innerText = "AI JAM";
      return;
    }

    const hit = session[index];
    hit.forEach(key => {
      const button = document.querySelector(`.${key}`);
      if (button) {
        playDrumSound(key, button);
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 100);
      }
    });

    index++;
  }, interval);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("AI").addEventListener("click", startVariantJam);
});