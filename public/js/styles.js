document.addEventListener('DOMContentLoaded', function() {
    // Simulate data loading
    setTimeout(function() {
      var loaderOverlay = document.getElementById('loader-overlay');
      loaderOverlay.style.display = 'none';
    }, 0); // 10 seconds
  });
// animation  




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




