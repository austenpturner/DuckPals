// DEPENDENCIES 


// DOM VARIABLES

const play = document.querySelector('#play-btn');
const sleep = document.querySelector('#sleep-btn');
const feed = document.querySelector('#feed-btn');
const pet = document.querySelector('#pet-btn');
const newDuck  = document.querySelector('#new-duck-btn');

// GLOBAL VARIABLES



// GLOBAL FUNCTIONS

function initializeDuck() {
    // display the duck 
};

function playDuck() {
    // make the duck not sleepy
    // make the duck hungry 
    // make the duck jump
};

function sleepDuck() {
    // make the duck not sleepy
    // make the duck not hungry 
    // make the duck sleep
};

function petDuck() {
    // make the duck sleepy
    // make the duck hungry 
    // make the duck smile
};

function feedDuck() {
    // make the duck not hungry 
    // make the duck sleepy
    // make the duck say thank you
};

function randInterval () {
    // randomly choose to select either hungry or sleepy boolean
    // if that boolean is 'false', change to 'true'
};

function getANewDuck() {
    // get the duck 
};

// EVENT LISTENERS

play.addEventListener('click', function (e) {
    playDuck();
    randInterval();
});

sleep.addEventListener('click', function (e) {
    sleepDuck();
    randInterval();
});

feed.addEventListener('click', function (e) {
    feedDuck();
    randInterval();
});

pet.addEventListener('click', function (e) {
    petDuck();
    randInterval();
});

newDuck.addEventListener('click', function (e) {
    getANewDuck();
    randInterval();
});


// START DUCK STATE

initializeDuck();
randInterval();