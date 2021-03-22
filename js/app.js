
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
var sections = document.querySelectorAll('section');
var navigatBar = document.getElementById('navbar__list');
var navItems = document.getElementsByTagName('li');
var fragment = document.createDocumentFragment();
const hamburger = document.getElementsByClassName('toggle')[0];
const navUL = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
sections.forEach(function (section) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    let sectionId = section.id;
    let sectionDataNav = section.dataset.nav;
    link.classList.add('menu__link');
    link.href = sectionId
    link.textContent = sectionDataNav;
    link.addEventListener("click",(event)=>{
        event.preventDefault();
        section.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})
       
    });
    item.appendChild(link)
    console.log(item)
    fragment.appendChild(item)
});
navigatBar.appendChild(fragment)




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
window.addEventListener('scroll', toggleActiveState);

function toggleActiveState() {
    let options = {
        root: null,
        threshold: 0.75
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return
            }
            // console.log(entry.target.dataset.nav);
            for (section of sections) {
                section.classList.remove('your-active-class');
                if (entry.target.id == section.id) {
                    section.classList.add('your-active-class');
                }
            }

            for (navItem of navItems) {
                navItem.children[0].classList.remove('item-active-class');
                console.log(navItem.children[0].textContent)
                if (entry.target.dataset.nav == navItem.children[0].textContent) {
                    navItem.children[0].classList.add('item-active-class');
                    console.log("yes")
                }
            }

            observer.unobserve(entry.target)
        });
    }, options);
    for (section of sections) {
        observer.observe(section)
    }
}

hamburger.addEventListener('click',()=>{
navUL.classList.toggle('show');
})