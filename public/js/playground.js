// Duck Food and Duck Bucks for Microtransactions
const duckBucks = 0;
const duckFood = 0;

const playBtn = document.querySelector("#play-btn");
const sleepBtn = document.querySelector("#sleep-btn");
const feedBtn = document.querySelector("#feed-btn");
const petBtn = document.querySelector("#pet-btn");
const newDuckBtn = document.querySelector("#new-duck-btn");
const duckBuckHead = document.querySelector("#duckbuck");
const duckFoodHead = document.querySelector("#duckfood");
const duckHungerHead = document.querySelector("#duckhunger");
const duckSleepyHead = document.querySelector("#ducksleepy");
const button = document.querySelector("button");
const duck = document.getElementsByClassName(".duck");

button.addEventListener("click", () => {
  let color = randomColor();
  for (var i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = color;
  }
});

// Sets the stats for the Duck bla bla bla
function duckStats() {
  duckBuckHead.innerHTML = `Duck Bucks: ${duckBucks}`;
  duckFoodHead.innerHTML = `Duck Food: ${duckFood}`;
  duckHungerHead.innerHTML = `Duck Hungry: `;
  duckSleepyHead.innerHTML = `Duck Sleepy: `;
}

function randomColor() {
  var firstNum = Math.floor(Math.random() * 255);
  var secondNum = Math.floor(Math.random() * 255);
  var thirdNum = Math.floor(Math.random() * 255);
  return "rgb(" + firstNum + "," + secondNum + "," + thirdNum + ")";
}

// DOM VARIABLES

// GLOBAL VARIABLES

const newDuck = data => {
  fetch("/ducklist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      if (err) throw err;
    });
};

// GLOBAL FUNCTIONS

const sleepy = data => {
  // need a put to the db to make sleepy boolean TRUE
  fetch("/ducklist/sleepy", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      res.json();
    })
    .catch(err => {
      if (err) throw err;
    });
};

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
  node.classList.add("animated", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);
    if (typeof callback === "function") callback();
  }
  node.addEventListener("animationend", handleAnimationEnd);
}

function makeDuckJump() {
  // interval where the image of the duck is replaced with a jumping duck
  console.log("getting here");
  animateCSS("#duck", "bounce");
  animateCSS("#eye", "jello");
  animateCSS("#wing", "headShake");
  animateCSS("#body", "jello");
  animateCSS("#duck", "flip");
  animateCSS("#eye", "flip");
  animateCSS("#pupil", "flip");
}

function makeDuckSleep() {
  // interval where the image of the duck is replaced with a sleeping duck
  console.log("getting here");
  animateCSS("#duck", "bounceOutDown");
  duckStats();
  // setInterval(console.log('sleepgin'), 3000)
}

function makeDuckSmile() {
  // interval where the image of the duck is replaced with a smiling duck
  console.log("getting here");
  animateCSS("#duck", "jello");
  animateCSS("#wing", "headShake");
  duckStats();
}

function makeDuckThank() {
  // interval where the image of the duck is replaced with a duck with a "thank you" thought bubble
  console.log("getting here");
  // animateCSS('#duck', 'rubberBand')
  animateCSS("#wing", "headShake");

  animateCSS("#body", "pulse");
  animateCSS("#beaktop", "swing");
  animateCSS("#beakbottom", "wobble");
  duckStats();
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

// EVENT LISTENERS
playBtn.addEventListener("click", function(e) {
  // e.preventDefault();

  // notSleepy();

  // hungry();

  makeDuckJump();
});

sleepBtn.addEventListener("click", function(e) {
  e.preventDefault();
  sleepy();
});

feedBtn.addEventListener("click", function(e) {
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

petBtn.addEventListener("click", function(e) {
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

newDuckBtn.addEventListener("click", function(e) {
  e.preventDefault();
  newDuck();
});
