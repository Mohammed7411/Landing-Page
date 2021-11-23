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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/


//"Welcome to my project :)
//I hope you find it good enough and I gladly await your feedback to enhance my skills ^^

// creating a Fragment to enhance the perofermance
const container = document.createDocumentFragment();
// saving all sections in variable
let sectionList = document.querySelectorAll("section");
// saving all anchors in variable
let anchorList = document.getElementById("#${section.id}");
// getting the UL by its ID
const myMenu = document.getElementById("navbar__list");
// save the button in var to use later in function
const myButton = document.getElementById("goTop");
// save the button in var to use later in function
const addButton = document.getElementById ("addSec");
// saving the div container in variable to add the new sections to it
const secCont = document.getElementById("secContainer")
// saving the text to easily add it to every new section
let text = document.getElementById("text").textContent;
let text2 = document.getElementById("text2").textContent;
// set counter to give each new section his number
let secNum = 4;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// add eventListener to the addButton to generate a section every time i click on it
addButton.addEventListener("click", function addSec(){
  sec = document.createElement ("section");    // create the section
  secNum +=1;     // increase the counter number by one
  // append the new section to the section container
  secCont.appendChild(sec);
  // display the menu bar when clicking on the button -Its related to the hideMenu function below-
  myMenu.classList.remove("hideMenu");
  // clear the content of the UL before adding the new lists - to avoid repeating the sections in navbar -
  myMenu.innerHTML="";
  sec.outerHTML=`<section id="section${secNum}" data-nav="Section ${secNum}">
  <div class="landing__container">
  <h2>Section ${secNum}</h2><p> ${text} <br> <br> ${text2}</p>
  </div> </div>`; // giving the new sections their id , classes and text content
  // saving all sections in variable including the new sections
  let sectionsNum = document.querySelectorAll ("section");
  sectionList = sectionsNum ; // update the global variable to contain the all sections
  menuBar (); // calling the function that create list for every section
});

// creating a function that create a list for each section
function menuBar () {
  let sectionList = document.querySelectorAll("section"); // saving all the sections in variable
  // making for loop to create list for each section in the variable sectionList
  for (section of sectionList) {
    nameOfSec = section.getAttribute("data-nav");  // getting the name of each section from the data nav
    const list = document.createElement("li");    // creating list
    // giving each list his class , id and name
    list.innerHTML = `<a class= "menu__link" id="#${section.id}" href="#${section.id}"> ${nameOfSec}</a>`
    container.appendChild(list);    // appending every list to the container
    myMenu.append(container);      // appending the container to the UL
    let anchors = document.querySelectorAll("a");  // saving all anchors in variable
    for (link of anchors) {
      link.addEventListener("click",smooth) // eventListener to make the scroll smooth
    }
    anchorList = anchors ;      // updating the global variable "anchorList" to include the new anchors
  }
}

function smooth(scro) {
  let links = this.getAttribute("href"); // getting the attribute of links
  scro.preventDefault();  // prevent the eventListener from scrolling directly
  document.querySelector(links).scrollIntoView({
    behavior: "smooth" // change the behavior to smooth
  });
}

//making function to hide the Top button if the user didn`t scrolled down enough
window.onscroll= function hideButton () {
  if (window.pageYOffset >= 600) {   // making an condition to display the button
    myButton.style.display="block";
  }
  else {                      // otherwise hidding the button
    myButton.style.display="none";
  }
}

myButton.addEventListener("click",function () {   // add eventListener to the Top button
  window.scrollTo(0,0)    // it scrolls to the top of the page once user clicked on it
})

function hideMenu () {     // hide the menu bar if the user scrolled down more than 400px
  if (window.pageYOffset >300){
    myMenu.classList.add("hideMenu")  // add class that makes display:none
  }
}
// excuting the hide menu function once every 5 seconeds
setInterval(hideMenu, 5000);
// function display the bar menu again when the user scrolling
document.addEventListener("scroll", function() {
// remove class that makes display:none;
  myMenu.classList.remove("hideMenu");
})
// function to add active class to the section that in the viewport
function activeClass () {
// for loop to check each section
for (section of sectionList) {
  // setting the condition that activate the class
  if ( window.pageYOffset >= (section.offsetTop -300) && window.pageYOffset <= (section.offsetTop +300)) {
    section.classList.add("your-active-class"); // adding the class if the section in the viewport
    let secId = section.id;                  // saving the section ID in variable
    for (anchor of anchorList) {            // for loop to the anchorList for each "a"
      if (anchor.id == ("#"+secId)) {      // if anchor id = section id then this is the target list
        anchor.classList.add("activeLink");
      }else {                          // otherwise removing the class
        anchor.classList.remove("activeLink");
      }
    }
  }
  else { // if section not in the viewport , remove the active class
    section.classList.remove("your-active-class");
  }
}
}

// add eventListener to excute the active class function while scrolling
document.addEventListener("scroll", activeClass) ;
// calling the function
menuBar ()
