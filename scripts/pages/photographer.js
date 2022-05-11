import { PhotographerFactory } from "../factories/PhotographerFactory.js";
import { PhotographerMediaFactory } from "../factories/PhotographerMediaFactory.js";
import { PhotographerCard } from "../templates/PhotographerCard.js";

async function getPhotographer() {

    var url_string = window.location.href
    var objectURL = new URL(url_string);
    var pageID = objectURL.searchParams.get("id");

    let data = await fetch('/data/photographers.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
    
    let elementJSON = data.photographers.find(item => item.id == pageID);
    let photographerByID = new PhotographerFactory(elementJSON, 'json');

    return photographerByID
}

async function getPhotographerMedia(photographer) {

    let data = await fetch('/data/photographers.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })

    let photographerMediaByID = [];
    
    data.media.forEach((item) => {
        if(item.photographerId === photographer.id) {
            const photographerMedia = new PhotographerMediaFactory(item, 'json');
            photographerMediaByID.push(photographerMedia)
        }
    }); 
    
    return photographerMediaByID
}

function displayPhotographersPageData(photographer) {
    let nodes = document.querySelector('.photograph-header');

    let template = new PhotographerCard(photographer);
    const userCardDOM = template.createPhotographerPage();
    nodes.append(userCardDOM);
};

function displayPhotographerMedia(photographerMedia) {
    let nodes = document.querySelector('.photograph-media');

    photographerMedia.forEach((photographer) => {
        let template = new PhotographerCard(photographer);
        const userCardDOM = template.createPhotographerMedia();
        nodes.append(userCardDOM);
    })
};

function displayPhotographerCarousel(photographerMedia) {
    let nodes = document.querySelector('.carousel');
    let nodes2 = document.querySelector('.carousel').children;

    console.log(nodes2)
    
    photographerMedia.forEach((photographer) => {
        let template = new PhotographerCard(photographer);
        const userCardDOM = template.createPhotographerCarousel();
        nodes.append(userCardDOM);
    })
    for(var i = 0; i < nodes2.length; i++) {
        var test = nodes2[i];
        test.classList.add("item" + [i]);
    }
};

async function init() {
    const photographer = await getPhotographer();
    displayPhotographersPageData(photographer);

    const photographerMediaByID = await getPhotographerMedia(photographer);
    displayPhotographerMedia(photographerMediaByID);

    const photographerCarousel = await getPhotographerMedia(photographer);
    displayPhotographerCarousel(photographerCarousel);
};

init();