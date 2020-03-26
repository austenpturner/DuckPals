$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  initializeDuck();
});

// Duck Food and Duck Bucks for Microtransactions
const userDuckBucks = 0;
const userDuckFood = 0;

const playBtn = document.querySelector("#play-btn");
const sleepBtn = document.querySelector("#sleep-btn");
const feedBtn = document.querySelector("#feed-btn");
const petBtn = document.querySelector("#pet-btn");
const newDuckBtn = document.querySelector("#new-duck-btn");
const duckBucks = document.querySelector("#duckbucks");
const duckFood = document.querySelector("#duckfood");
const duckHunger = document.querySelector("#duckhunger");
const duckSleepy = document.querySelector("#ducksleepy");
const duckName = document.querySelector("#duckname");
const button = document.querySelector("button");
const duck = document.getElementsByClassName(".duck");
let quack = document.querySelector("audio");

button.addEventListener("click", () => {
  let color = randomColor();
  for (var i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = color;
  }
});

function initializeDuck() {
  animateCSS("#duck", "bounceInDown");
  duckStats();
}

// Sets the stats for the Duck bla bla bla
function duckStats() {
  $.get("/api/playground", function(data) {
    console.log(data);
    duckName.innerHTML = `Duckie Name: ${data.Ducks[0].name}`;
    duckHunger.innerHTML = `Is ${data.Ducks[0].name} hungry? ${data.Ducks[0].hungry}`;
    duckSleepy.innerHTML = `Is ${data.Ducks[0].name} sleepy? ${data.Ducks[0].sleepy}`;
    duckFood.innerHTML = `${data.duckfood}`;
    duckBucks.innerHTML = `${data.duckbucks}`;
  });
}

function playQuack() {
  quack.setAttribute("src", "./assets/quack1.mp3");
  let playPromise = quack.play();

  if (playPromise !== undefined) {
    playPromise
      .then(_ => {})
      .catch(err => {
        console.log(err);
      });
  }
}

function randomColor() {
  var firstNum = Math.floor(Math.random() * 255);
  var secondNum = Math.floor(Math.random() * 255);
  var thirdNum = Math.floor(Math.random() * 255);
  return "rgb(" + firstNum + "," + secondNum + "," + thirdNum + ")";
}

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
      console.log(err);
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
  }).then(response => {
    duckStats();
    return response.json();
  });
};

const notSleepy = data => {
  fetch("/ducklist/notsleepy", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    duckStats();
    return response.json();
  });
};

const hungry = data => {
  // need a put to the db to make hungry boolean TRUE
  fetch("/ducklist/hungry", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    duckStats();
    return response.json();
  });
};

const notHungry = data => {
  // need a put to the db to make hungry boolean FALSE
  fetch("/ducklist/nothungry", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    duckStats();
    return response.json();
  });
};

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
  // setInterval(console.log('sleepgin'), 3000)
}

function makeDuckSmile() {
  // interval where the image of the duck is replaced with a smiling duck
  console.log("getting here");
  animateCSS("#wing", "headShake");
  animateCSS("#duck", "wobble");
  animateCSS("#head", "shake");
  animateCSS("#eye", "pulse");
}

function makeDuckThank() {
  // interval where the image of the duck is replaced with a duck with a "thank you" thought bubble
  console.log("getting here");
  animateCSS("#wing", "headShake");
  animateCSS("#head", "pulse");
  animateCSS("#body", "pulse");
  animateCSS("#beaktop", "swing");
  animateCSS("#beakbottom", "wobble");
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
playBtn.addEventListener("click", async () => {
  hungry();
  makeDuckJump();
  playQuack();
});

sleepBtn.addEventListener("click", async () => {
  sleepy();
  makeDuckSleep();
  playQuack();
});

feedBtn.addEventListener("click", async () => {
  notHungry();
  makeDuckThank();
  playQuack();
});

petBtn.addEventListener("click", async () => {
  notSleepy();
  makeDuckSmile();
  playQuack();
});

newDuckBtn.addEventListener("click", function(e) {
  e.preventDefault();
  newDuck();
});
