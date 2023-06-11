
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




