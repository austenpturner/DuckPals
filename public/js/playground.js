document.addEventListener("DOMContentLoaded", () => {
  // Handler when the DOM is fully loaded
  initializeDuck();
});

// DOM Elements
const playBtn = document.querySelector("#play-btn");
const sleepBtn = document.querySelector("#sleep-btn");
const feedBtn = document.querySelector("#feed-btn");
const petBtn = document.querySelector("#pet-btn");
const buyBtn = document.querySelector("#buy-btn");
const newDuckBtn = document.querySelector("#new-duck-btn");
const duckBucks = document.querySelector("#duckbucks");
const duckFood = document.querySelector("#duckfood");
const duckHunger = document.querySelector("#duckhunger");
const duckSleepy = document.querySelector("#ducksleepy");
const duckName = document.querySelector("#duckname");
const colorBtn = document.querySelector("#color-btn");
const colorForm = document.querySelector("#color-form");
const radioBtns = document.querySelectorAll(".color-radio");
const saveColorBtn = document.querySelector("#save-color");
const duck = document.querySelectorAll(".duck");
const colorSpan = document.querySelector('#duckcolor');
const idSpan = document.querySelector('#duckid');
let quack = document.querySelector("audio");

// Duck Food and Duck Bucks for Microtransactions
let colorRGB;

// Display color form
colorBtn.addEventListener("click", () => {
  saveColorBtn.textContent = "Save Duck Color";
  if (colorForm.style.display === "none") {
    colorForm.style.display = "block";
  } else {
    colorForm.style.display = "none";
  }
});

// Change duck color
colorForm.addEventListener("click", () => {
  const colorName = getRadioColor();
  colorRGB = getRGB(colorName);
  for (let i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = colorRGB;
  }
});

// Save duck color to database
saveColorBtn.addEventListener("click", e => {
  e.preventDefault();
  const savedColor = colorRGB;
  const duckId = idSpan.textContent;
  const duckData = {
    id: duckId,
    color: savedColor
  };
  saveColorBtn.textContent = "Saved!";
  setTimeout(() => {
    colorForm.style.display = "none";
  }, 1000);
  fetch("/ducklist/color", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(duckData)
  }).then(res => {
    return res.json();
  }).then(() => {
    console.log('updated color');
  })


  // $.post("/ducklist/color", { color: savedColor }, () => {
  //   duckStats();
  // });
});

// Get color from selected radio button
const getRadioColor = () => {
  for (let i = 0; i < radioBtns.length; i++) {
    let radioBtn = radioBtns[i];
    if (radioBtn.checked) {
      const color = radioBtn.id;
      return color;
    }
  }
};

// Get RGB values from radio color strings
const getRGB = color => {
  switch (color) {
    case "red":
      return `rgb(240, 70, 70)`;
    case "orange":
      return `rgb(255, 170, 80)`;
    case "yellow":
      return `rgb(255, 255, 0)`;
    case "green":
      return `rgb(20, 180, 80)`;
    case "blue":
      return `rgb(50, 200, 250)`;
    case "purple":
      return `rgb(210, 100, 250)`;
  }
};

const getDuckColor = () => {
  console.log(colorSpan.textContent);
  const color = colorSpan.textContent;
  for (let i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = color;
  }
}

function initializeDuck() {
  getDuckColor();
  animateCSS("#duck", "bounceInDown");
  duckStats();
};

// Sets the stats for the Duck bla bla bla
function duckStatsInit() {
  $.get("/api/playground", function(data) {
    duckName.innerHTML = `Duckie Name: ${data.Ducks[0].name}`;
    duckHunger.innerHTML = `Is ${data.Ducks[0].name} hungry? ${data.Ducks[0].hungry}`;
    duckSleepy.innerHTML = `Is ${data.Ducks[0].name} sleepy? ${data.Ducks[0].sleepy}`;
    duckFood.innerHTML = `Duck Food: ${data.duckfood}`;
    duckBucks.innerHTML = `Duck Bucks: $${data.duckbucks}`;
  });
}

function buyFood() {
  $.get("/api/buyfood", function(data) {
    console.log(data);
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

// GLOBAL VARIABLES

const newDuck = data => {
  fetch("/ducklist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  }).catch(err => {
    console.log(err);
  });
};

// GLOBAL FUNCTIONS

const sleepy = () => {
  let sleepyValue = duckSleepy.firstElementChild.textContent;
  if (sleepyValue) {
    sleepyValue = false;
  } else {
    sleepyValue = true;
  }
  const duckId = idSpan.textContent;
  const data = {
    sleepy: sleepyValue, 
    id: duckId
  }
  // need a put to the db to make sleepy boolean TRUE
  fetch("/ducklist/sleepy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => {
    duckStats();
  });
};

const hungry = () => {
  let hungryValue = duckHunger.firstElementChild.textContent;
  console.log(hungryValue);
  if (hungryValue) {
    hungryValue = false;
  } else {
    hungryValue = true;
  }
  console.log(hungryValue);
  const duckId = idSpan.textContent;
  const data = {
    hungry: hungryValue, 
    id: duckId
  }
  // need a put to the db to make sleepy boolean TRUE
  fetch("/ducklist/hungry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(data => {
    console.log(data);
    if (data.hungry === true && data.duckfood < 0) {
        window.location.replace("/pay/splash");
      }
  })
  .then(() => {
    duckStats();
  });
  // need a put to the db to make hungry boolean TRUE
  // $.post("/ducklist/hungry", function(data) {
  //   console.log(data);
  //   if (data.hungry === true && data.duckfood < 0) {
  //     window.location.replace("/pay/splash");
  //   }
  // }).then(response => {
  //   duckStats();
  // });
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
  animateCSS("#duck", "bounceOutDown");
  // setInterval(console.log('sleepgin'), 3000)
}

function makeDuckSmile() {
  // interval where the image of the duck is replaced with a smiling duck
  animateCSS("#wing", "headShake");
  animateCSS("#duck", "wobble");
  animateCSS("#head", "shake");
  animateCSS("#eye", "pulse");
}

function makeDuckThank() {
  // interval where the image of the duck is replaced with a duck with a "thank you" thought bubble
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
playBtn.addEventListener("click", () => {
  hungry();
  makeDuckJump();
  playQuack();
});

sleepBtn.addEventListener("click", () => {
  sleepy();
  makeDuckSleep();
  playQuack();
});

feedBtn.addEventListener("click", () => {
  hungry();
  makeDuckThank();
  playQuack();
});

petBtn.addEventListener("click", () => {
  sleepy();
  makeDuckSmile();
  playQuack();
});

newDuckBtn.addEventListener("click", function() {
  newDuck();
});

buyBtn.addEventListener("click", function() {
  buyFood();
});
