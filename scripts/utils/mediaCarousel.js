// Global var
var main = document.getElementById("main");
var carousel = document.getElementById("contact_mediaCarousel");
//const $carouselPauseBtn = document.getElementsByClassName("carousel-pause-btn")
var $prevBtn = document.getElementsByClassName("backCarousel")
var $nextBtn = document.getElementsByClassName("nextCarousel")
var $carouselItems = document.getElementsByClassName("liCarousel")

let currentItemPosition = 0
let carouselInterval
// Funcs
function displayCarousel() {
	carousel.style.display = "block";
    main.style.pointerEvents = "none";
    main.style.opacity = 0.2;
    carousel.setAttribute('aria-hidden', 'false');
    $carouselItems[0].style.display = "block";
}

function closeCarousel() {
    carousel.style.display = "none";
    main.style.pointerEvents = "auto";
    main.style.opacity = 1;
    carousel.setAttribute('aria-hidden', 'true');
}

const goToNextSlide = () => {
   if (currentItemPosition + 1 >=  $carouselItems.length) {
      
       const lastItem = `.item${currentItemPosition}`
 
       currentItemPosition = 0
       const currentItem = `.item${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   } else {
       currentItemPosition += 1
       const lastItem = `.item${currentItemPosition - 1}`
       const currentItem = `.item${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   }
}
 
const goToPreviousSlide = () => {
   if (currentItemPosition - 1 >=  0) {
       currentItemPosition -= 1
       const currentItem = `.item${currentItemPosition}`
       const lastItem = `.item${currentItemPosition + 1}`
 
       setNodeAttributes(lastItem, currentItem)
   } else {
       const lastItem = `.item${currentItemPosition}`
      
       currentItemPosition = 2
       const currentItem = `.item${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   }
}
 
 
const setNodeAttributes = (lastItem, currentItem) => {
   document.querySelector(lastItem).style.display = "none";
   document.querySelector(currentItem).style.display = "block";
   //document.querySelector(lastItem).attr('aria-hidden', 'true')
   //document.querySelector(currentItem).attr('aria-hidden', 'false')
}
 
 
// Events
function previousMedia() {
   goToPreviousSlide()
}
 
function nextMedia() {
   goToNextSlide()
}