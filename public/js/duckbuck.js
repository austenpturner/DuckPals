const duckBuckButton = document.querySelector("#duckBuckBtn");

function duckBuckGet() {
  $.get("/api/duckbuck", data => {
    console.log(data);
  });
}

duckBuckButton.addEventListener("submit", duckBuckGet());
