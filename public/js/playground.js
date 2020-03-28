// ---------- DOM Elements --------- //

// Buttons
const playBtn = document.querySelector("#play-btn");
const sleepBtn = document.querySelector("#sleep-btn");
const feedBtn = document.querySelector("#feed-btn");
const petBtn = document.querySelector("#pet-btn");
const buyBtn = document.querySelector("#buy-btn");
const saveColorBtn = document.querySelector("#save-color");
const colorBtn = document.querySelector("#color-btn");

// Duck Values
const duckBucks = document.querySelector("#duckbucks");
const duckFood = document.querySelector("#duckfood");
const duckHunger = document.querySelector("#duckhunger");
const duckSleepy = document.querySelector("#ducksleepy");
const duckName = document.querySelector("#duckname");
const colorSpan = document.querySelector("#duckcolor");
const idSpan = document.querySelector("#duckid");

// Color Form
const colorForm = document.querySelector("#color-form");
const radioBtns = document.querySelectorAll(".color-radio");

// Duck and Duck Audio
const duck = document.querySelectorAll(".duck");
const quack = document.querySelector("audio");

// Global variables
let colorRGB;

// Render duck on page load
document.addEventListener("DOMContentLoaded", () => {
  animateCSS("#duck", "bounceInDown");
  getDuckColor();
});

// ---------- Event Listeners --------- //

playBtn.addEventListener("click", () => {
  hungry("play");
  makeDuckJump();
  playQuack();
});

sleepBtn.addEventListener("click", () => {
  sleepy("sleep");
  makeDuckSleep();
  playQuack();
});

feedBtn.addEventListener("click", () => {
  hungry("feed");
  subtractDuckbucks();
  makeDuckThank();
  playQuack();
});

petBtn.addEventListener("click", () => {
  sleepy("pet");
  makeDuckSmile();
  playQuack();
});

buyBtn.addEventListener("click", function() {
  buyFood();
});

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
  saveDuckColor(duckData);
});

// ---------- Global Functions --------- //

const saveDuckColor = duckData => {
  fetch("/ducklist/color", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(duckData)
  })
    .then(res => {
      return res.json();
    })
    .then(() => {
      console.log("updated color");
    });
};

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
  const color = colorSpan.textContent;
  for (let i = 0; i < duck.length; i++) {
    duck[i].style.backgroundColor = color;
  }
};

const buyFood = () => {
  $.get("/api/buyfood", function(data) {
    console.log(data);
  }).then(() => {
    duckbucks = duckBucks.textContent;
    duckbucks++;
    duckBucks.textContent = duckbucks;
  });
};

const playQuack = () => {
  quack.setAttribute("src", "./assets/quack1.mp3");
  const playPromise = quack.play();
  if (playPromise !== undefined) {
    playPromise
      .then(_ => {})
      .catch(err => {
        console.log(err);
      });
  }
};

const sleepy = action => {
  let sleepyValue;
  if (action === "sleep") {
    sleepyValue = false;
  } else if (action === "pet") {
    sleepyValue = true;
  }
  const duckId = idSpan.textContent;
  const data = {
    sleepy: sleepyValue,
    id: duckId
  };
  fetch("/ducklist/sleepy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => {
    duckSleepy.textContent = sleepyValue;
  });
};

const hungry = action => {
  let hungryValue;
  if (action === "play") {
    hungryValue = true;
  } else if (action === "feed") {
    hungryValue = false;
  }
  const duckId = idSpan.textContent;
  const data = {
    hungry: hungryValue,
    id: duckId
  };
  fetch("/ducklist/hungry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => {
    duckHunger.textContent = hungryValue;
    if (action === "feed" && duckFood.textContent < 0) {
      window.location.replace("/pay/splash");
    }
  });
};

const subtractDuckbucks = () => {
  const data = {
    duckbucks: duckBucks.textContent
  };
  fetch("/api/duckbuck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => {
    duckfood = duckFood.textContent;
    duckfood--;
    duckFood.textContent = duckfood;
  });
};

const animateCSS = (element, animationName, callback) => {
  const node = document.querySelector(element);
  node.classList.add("animated", animationName);
  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);
    if (typeof callback === "function") callback();
  }
  node.addEventListener("animationend", handleAnimationEnd);
};

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
