// window.onload( () => {  // Getting references to our form and inputs
  const submitBtn = document.getElementById('submit-btn');
  var emailInput = document.getElementById('email-input');
  var passwordInput = document.getElementById('password-input');

  // When the form is submitted, we validate there's an email and password entered
  submitBtn.addEventListener('click', e => {
    e.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    emailInput.value = '';
    passwordInput.value = '';
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (data) => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
      console.log('sent');
      return res.json();
    }).then(() => {
      console.log('sent back');
        // location.reload('/ducklist');
        // If there's an error, log the error
      })
      .catch(err =>{
        console.log(`Error ${err}`);
      });
  }
// });
