// Global var
const carouselMain = document.getElementById("main");
const carousel = document.getElementById("contact_mediaCarousel");
//const $carouselPauseBtn = document.getElementsByClassName("carousel-pause-btn")
const $prevBtn = document.getElementsByClassName("backCarousel")
const $nextBtn = document.getElementsByClassName("nextCarousel")
const $carouselItems = document.getElementsByClassName("liCarousel")
const crossClosingModal = document.getElementById("buttonCloseModal")

let currentItemPosition = 0
let carouselInterval
// Funcs
function displayCarousel(position) {
	carousel.style.display = "block";
    carouselMain.style.pointerEvents = "none";
    carousel.setAttribute('aria-hidden', 'false');
    carouselMain.setAttribute('aria-hidden', 'true');
    carouselMain.style.visibility = 'hidden';
    $carouselItems[position].style.display = "block";
    currentItemPosition = position
}

function closeCarousel() {
    carousel.style.display = "none";
    carouselMain.style.pointerEvents = "auto";
    carousel.setAttribute('aria-hidden', 'true');
    carouselMain.setAttribute('aria-hidden', 'false');
    const $carouselItemsList = document.querySelectorAll(".liCarousel")
    $carouselItemsList.forEach( item => {
        item.style.display = 'none'
    })
    currentItemPosition = 0
    carouselMain.style.visibility = 'visible';
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
      
       currentItemPosition = $carouselItems.length - 1
       const currentItem = `.item${currentItemPosition}`
      
       setNodeAttributes(lastItem, currentItem)
   }
}
 
 
const setNodeAttributes = (lastItem, currentItem) => {
   document.querySelector(lastItem).style.display = "none";
   document.querySelector(currentItem).style.display = "block";
   document.querySelector(lastItem).setAttribute('aria-hidden', 'true')
   document.querySelector(currentItem).setAttribute('aria-hidden', 'false')
}


document.addEventListener('keydown', (event) => {

    const keyCode = event.keyCode ? event.keyCode : event.which
    
    if (keyCode === 39) {
        goToNextSlide();
    } else if (keyCode === 37) {
        goToPreviousSlide();
    } else if (keyCode === 27) {
        closeCarousel();
    }
 })
 
// Events
function previousMedia() {
   goToPreviousSlide()
}
 
function nextMedia() {
   goToNextSlide()
}