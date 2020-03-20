// window.onload( () => {
  // Getting references to our form and input
  const signUpBtn = document.getElementById('submit-btn')
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const alertMsg = document.getElementById('alert-msg');
  const alertContainer = document.getElementById('alert-container');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpBtn.addEventListener('click', e => {
    e.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };

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
    console.log(data);
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(data => {
        location.reload('/ducklist');
        // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr());
  }

  const handleLoginErr = err => {
    alertMsg.textContent = 'Error.';
    alertContainer.style.display = 'block';
  }
// });

