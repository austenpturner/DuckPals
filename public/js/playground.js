// DEPENDENCIES

// const Duck = require('../../models/duck');

// Austen's duck code

// Duck Food and Duck Bucks for Microtransactions
const duckbucks = 0;
const duckFood = 0;

const duckBuckHead = document.querySelector('duckbuck');
const duckFoodHead = document.querySelector('duckfood');
const button = document.querySelector('button');
const duck = document.getElementsByClassName('duck');

button.addEventListener('click', () => {
  let color = randomColor();
  for (var i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = color;
  }
});

function duckDeath() {}

function randomColor() {
  var firstNum = Math.floor(Math.random() * 255);
  var secondNum = Math.floor(Math.random() * 255);
  var thirdNum = Math.floor(Math.random() * 255);
  return 'rgb(' + firstNum + ',' + secondNum + ',' + thirdNum + ')';
}

// DOM VARIABLES

const playBtn = document.querySelector('#play-btn');
const sleepBtn = document.querySelector('#sleep-btn');
const feedBtn = document.querySelector('#feed-btn');
const petBtn = document.querySelector('#pet-btn');
const newDuckBtn = document.querySelector('#new-duck-btn');

// GLOBAL VARIABLES

// the duck veriable that represents the duck we are currently manipulating
// const thisDuck =

// GLOBAL FUNCTIONS

function initializeDuck() {
  // display the duck
}

function sleepy() {
  // need a put to the db to make sleepy boolean TRUE
}

function notSleepy() {
  // need a put to the db to make sleepy boolean FALSE
}

function hungry() {
  // need a put to the db to make hungry boolean TRUE
}

function notHungry() {
  // need a put to the db to make hungry boolean FALSE
}

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add('animated', animationName);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
}

function makeDuckJump() {
  // interval where the image of the duck is replaced with a jumping duck
  console.log('getting here');
  animateCSS('#duck', 'bounce');
}

function makeDuckSleep() {
  // interval where the image of the duck is replaced with a sleeping duck
  console.log('getting here');
  animateCSS('#duck', 'bounceOutDown');
  // setInterval(console.log('sleepgin'), 3000)
}

function makeDuckSmile() {
  // interval where the image of the duck is replaced with a smiling duck
  console.log('getting here');
  animateCSS('#duck', 'tada');
}

function makeDuckThank() {
  // interval where the image of the duck is replaced with a duck with a "thank you" thought bubble
  console.log('getting here');
  animateCSS('#duck', 'rubberBand');
}

function randIntervalSwitch() {
  // randomly choose to select either hungry or sleepy boolean
  // randomly selects one of the booleans and changes it to 'true' if it is alread false
  let randNum = Math.floor(Math.random() * 2);
  if ((randNum = 1 && !hungry)) {
    hungry();
    //need to include a put to the database to change the boolean
  } else if ((randNum = 0 && !sleepy)) {
    sleepy();
    //need to include a put to the database to change the boolean
  }
}

function randWaitTime() {
  // set a randon lenght of time after the user does something before moving on
  let ranWait = Math.floor(Math.random() * 10000);
  //randomly choses to switch sleepy or hungry to true, if they are false
  setInterval(randIntervalSwitch(), ranWait);
}

function getANewDuck() {
  // redirectt to the new duck page
}

// EVENT LISTENERS

playBtn.addEventListener('click', function(e) {
  // e.preventDefault();
  // // make the duck not sleepy
  // notSleepy();
  // // make the duck hungry
  // hungry();
  // make the duck jump
  makeDuckJump();
  // timer after that
  // randWaitTime();
});

sleepBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // make the duck not sleepy
  notSleepy();
  // make the duck not hungry
  notHungry();
  // make the duck sleep
  makeDuckSleep();
  // timer after that
  randWaitTime();
});

feedBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // make the duck not hungry
  notHungry();
  // make the duck sleepy
  sleepy();
  // make the duck say thank you
  makeDuckThank();
  // timer after that
  randWaitTime();
});

petBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // make the duck sleepy
  sleepy();
  // make the duck hungry
  hungry();
  // make the duck smile
  makeDuckSmile();
  // timer after that
  randWaitTime();
});

newDuckBtn.addEventListener('click', function(e) {
  e.preventDefault();
  getANewDuck();
});

// START DUCK STATE

initializeDuck();

// PARTICLES FOR BATH TIME

particlesJS('particles-js', {
  particles: {
    number: {
      value: 111,
      density: { enable: true, value_area: 3046.4829156444935 }
    },
    color: { value: '#9adade' },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      image: { src: 'img/github.svg', width: 100, height: 100 }
    },
    opacity: {
      value: 0.44093831673801875,
      random: true,
      anim: {
        enable: false,
        speed: 0.6496617698410762,
        opacity_min: 0.10557003759917487,
        sync: false
      }
    },
    size: {
      value: 86.80624057954999,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: '#dc1111',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 28.861417095579412,
      direction: 'top',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: true, mode: 'repulse' },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
