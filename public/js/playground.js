// DEPENDENCIES 

const Duck = require('../../models/duck');

// DOM VARIABLES

const play = document.querySelector('#play-btn');
const sleep = document.querySelector('#sleep-btn');
const feed = document.querySelector('#feed-btn');
const pet = document.querySelector('#pet-btn');
const newDuck  = document.querySelector('#new-duck-btn');

// GLOBAL VARIABLES

// the duck veriable that represents the duck we are currently manipulating
const thisDuck = 

// GLOBAL FUNCTIONS

function initializeDuck() {
    // display the duck 
};

function playDuck() {
    // make the duck not sleepy
    // make the duck hungry 
    // make the duck jump
    // timer after that
    randWaitTime();
};

function sleepDuck() {
    // make the duck not sleepy
    // make the duck not hungry 
    // make the duck sleep
    // timer after that
    randWaitTime();
};

function petDuck() {
    // make the duck sleepy
    // make the duck hungry 
    // make the duck smile
    // timer after that
    randWaitTime();
};

function feedDuck() {
    // make the duck not hungry 
    // make the duck sleepy
    // make the duck say thank you
    // timer after that
    randWaitTime();
};

function randIntervalSwitch () {
    // randomly choose to select either hungry or sleepy boolean
    // if that boolean is 'false', change to 'true'
};

function randWaitTime() {
    // set a randon lenght of time after the user does something before moving on
    randIntervalSwitch();
};

function getANewDuck() {
    // get the duck 
};

// EVENT LISTENERS

play.addEventListener('click', function (e) {
    e.preventDefault(); 
    playDuck();
});

sleep.addEventListener('click', function (e) {
    e.preventDefault(); 
    sleepDuck();
});

feed.addEventListener('click', function (e) {
    e.preventDefault(); 
    feedDuck();
});

pet.addEventListener('click', function (e) {
    e.preventDefault(); 
    petDuck();
});

newDuck.addEventListener('click', function (e) {
    e.preventDefault(); 
    getANewDuck();
});


// START DUCK STATE

initializeDuck();
