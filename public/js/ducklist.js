$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.email);
  });
});

const duckNameInp = document.querySelector('#duckname');
const hatch = document.querySelector('#hatch-btn');

// Event listener
hatch.addEventListener('click', e => {
  e.preventDefault();
  const duckName = duckNameInp.value.trim();
  const duckData = {
    name: duckName
  };
  // Validate the email and password are not blank
  if (!duckData.name) {
    return;
  }
  // If we have an email and password, run the signUpUser function
  addDuck(duckData);
  duckNameInp.value = '';
});

// Creates a duck in the database. If successful, we are redirectto the playground
// Otherwise we log errors
const addDuck = data => {
  fetch('/api/newduck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .then(() => {
      window.location.replace('/playground');
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleDuckErr);
};

const handleDuckErr = err => {
  console.log(`Error: ${err}`);
};
