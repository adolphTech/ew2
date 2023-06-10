// document.addEventListener('DOMContentLoaded', function() {
//     // Simulate data loading
//     setTimeout(function() {
//       var loaderOverlay = document.getElementById('loader-overlay');
//       loaderOverlay.style.display = 'none';
//     }, 300); // 10 seconds
//   });
// // animation  

var spinnerAnimation;

function startSpinner() {
  spinnerAnimation = document.querySelector("#loader").style.animation;
  document.querySelector("#loader").style.animationPlayState = "running";
  document.querySelector("#loading-text").style.animationPlayState = "running";
}

function stopSpinner() {
  document.querySelector("#loader").style.animationPlayState = "paused";
  document.querySelector("#loading-text").style.animationPlayState = "paused";
}

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "visible") {
    startSpinner();
  } else {
    stopSpinner();
  }
});

// Start the spinner initially
startSpinner();




// toggle side bar 
let toggleSide = false;

function openNav() {
    document.getElementById("mySidebar").style.width = "250px"
    toggleSide = true;

}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0"
    toggleSide = false;

}

const sidebarToggler = document.getElementById("sidebarToggler");

sidebarToggler.addEventListener("click", () => {

        !toggleSide ? openNav() : closeNav()

    })
    // navbar toggle




