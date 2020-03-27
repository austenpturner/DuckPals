// Getting references to our form and inputs
const loginBtn = document.getElementById("login-btn");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

// Login Button event listener
loginBtn.addEventListener("click", e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const userData = {
    email: email,
    password: password
  };
  // Validate there's an email and password entered
  if (!userData.email || !userData.password) {
    return;
  }
  // If we have an email and password we run the loginUser function and clear the form
  loginUser(userData);
  emailInput.value = "";
  passwordInput.value = "";
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
const loginUser = data => {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(() => {
      window.location.replace("/ducklist");

      // If there's an error, log the error
    })
    .catch(err => {
      console.log(`Error ${err}`);
    });
};
