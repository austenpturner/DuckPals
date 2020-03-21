// DOM Elements
const signUpBtn = document.getElementById('signUp-btn')
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const alertMsg = document.getElementById('alert-msg');
const alertContainer = document.getElementById('alert-container');

// Event listener
signUpBtn.addEventListener('click', e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const userData = {
    email: email,
    password: password
  };
  // Validate the email and password are not blank
  if (!userData.email || !userData.password) {
    return;
  }
  // If we have an email and password, run the signUpUser function
  signUpUser(userData);
  emailInput.value = '';
  passwordInput.value = '';
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
const signUpUser = data => {
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  }).then(() => {
      window.location.replace("/login");
  // If there's an error, handle it by throwing up a bootstrap alert
  }).catch(handleLoginErr);
};

const handleLoginErr = err => {
  alertMsg.textContent = `Error: ${err}`;
  alertContainer.style.display = 'block';
};
