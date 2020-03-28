const duckNameInp = document.querySelector("#duckname");
const hatchBtn = document.querySelector("#hatch-btn");
const selectBtns = document.querySelectorAll(".select-btn");

// Event listener
hatchBtn.addEventListener("click", e => {
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
  duckNameInp.value = "";
});

for (let i = 0; i < selectBtns.length; i++) {
  selectBtns[i].addEventListener("click", e => {
    e.preventDefault();
    const name = e.target.previousElementSibling.textContent;
    const duckName = {
      name: name
    };
    // send selected duck's name to /api/playground in api-routes.js
    selectDuck(duckName);
  });
}

const selectDuck = name => {
  fetch("/api/playground", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(name)
  })
    .then(res => {
      res.json();
    })
    .then(() => {
      window.location.replace("/playground");
    });
};

const addDuck = data => {
  fetch("/api/ducklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      res.json();
    })
    .then(() => {
      window.location.reload();
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleDuckErr);
};

const handleDuckErr = err => {
  console.log(`Error: ${err}`);
};
