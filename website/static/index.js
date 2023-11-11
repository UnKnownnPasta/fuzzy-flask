const navbar_links = document.getElementById('navbar-li'),
    navbar_button = document.getElementById('navbar-collapse');
var navbar_active = true

function navbar_collapse() {
    navbar_links.style.opacity = navbar_active ? 0 : 1
    navbar_links.style.top = navbar_active ? "20%" : "0%"
    navbar_active = !navbar_active
}

navbar_button.addEventListener('click', navbar_collapse)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

function hidePopup() {
    var popup = Array.from(document.getElementsByClassName('popup'))
    popup.forEach(pop => {
        pop.remove()
    })
}

Array.from(document.getElementsByClassName('popup-button')).forEach(popup => {
    popup.addEventListener('click', hidePopup)
})