import { PhotographerFactory } from "../factories/PhotographerFactory.js";
import { PhotographerMediaFactory } from "../factories/PhotographerMediaFactory.js";
import { PhotographerCard } from "../templates/PhotographerCard.js";


let likesArray = [];
let sum = 0;

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

    // fetch pour récupérer les medias
    // Ajout du système de likes
    // ajoute les medias dans un tableau
    // système de tri (select)
    // return du tableau de medias


    let data = await fetch('/data/photographers.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })

    let photographerMediaByID = [];
    let likes = document.getElementById('likesShow');

    
    const option1 = document.getElementById('opt1');
    const option2 = document.getElementById('opt2');
    const option3 = document.getElementById('opt3');
    let nodes2 = document.querySelector('.carousel').children;

    data.media.forEach((item) => {
        if(item.photographerId === photographer.id) {
            const photographerMedia = new PhotographerMediaFactory(item, 'json');
            photographerMediaByID.push(photographerMedia)
            likesArray.push(photographerMedia.likes)
            likes.innerHTML = likesArray.reduce((previousValue, currentValue) => previousValue + currentValue, sum)
        }
    });

    option3.addEventListener('click', function() {
        photographerMediaByID.sort(function(a, b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        })
        for(var i = 0; i < nodes2.length; i++) {
            var test = nodes2[i];
            test.classList.forEach(item=>{
                if(item.startsWith('item')) {
                    test.classList.remove(item) ;
                }
            })
        }
        displayNewMedia(photographerMediaByID);
    })

    option2.addEventListener('click', function() {
        photographerMediaByID.sort((a, b) => a.date - b.date)
        for(var i = 0; i < nodes2.length; i++) {
            var test = nodes2[i];
            test.classList.forEach(item=>{
                if(item.startsWith('item')) {
                    test.classList.remove(item) ;
                }
            })
        }
        displayNewMedia(photographerMediaByID);
    })

    option1.addEventListener('click', function() {
        photographerMediaByID.sort((a, b) => a.likes - b.likes);
        for(var i = 0; i < nodes2.length; i++) {
            var test = nodes2[i];
            test.classList.forEach(item=>{
                if(item.startsWith('item')) {
                    test.classList.remove(item) ;
                }
            })
        }
        displayNewMedia(photographerMediaByID);
    })
    
    return photographerMediaByID
}

function displayNewMedia(photographerMedia) {
    //supprimer les medias de l'écran
    let medias = document.querySelector('.photograph-media');
    let carousel = document.querySelector('.carousel');
    medias.innerHTML = "";
    carousel.innerHTML = "";

    //afficher le html de chaque média à l'ecran
    displayPhotographerMedia(photographerMedia)

    //réattacher le système de likes
    let addLikes = document.querySelectorAll('.textMedia__likes');
    const heartLikes = document.querySelectorAll('#buttonLikes');
    const heartStyle = document.querySelectorAll('.textMedia__icon')
    let likes = document.getElementById('likesShow');
    for (let i = 0 ; i < heartLikes.length; i++) {
        heartLikes[i].addEventListener('click', function () {
            if(!heartStyle[i].classList.contains("fa-solid")) {
                addLikes[i].innerHTML++;
                heartStyle[i].classList.add("fa-solid")
                heartStyle[i].style.color = '#911C1C'
                likes.innerHTML++
            } else {
                addLikes[i].innerHTML--;
                heartStyle[i].classList.remove("fa-solid")
                heartStyle[i].style.color = '#911C1C'
                likes.innerHTML--
            }
        })
    }

    //recreer le carousel
    displayPhotographerCarousel(photographerMedia)

    //ajouter l'ensemble des likes
    photographerMedia.forEach((item) => {
            likesArray.push(item.likes)
            likes.innerHTML = likesArray.reduce((previousValue, currentValue) => previousValue + currentValue, sum)
    });
}

function displayPhotographersPageData(photographer) {
    let nodes = document.querySelector('.photograph-header');

    let template = new PhotographerCard(photographer);
    const userCardDOM = template.createPhotographerPage();
    nodes.append(userCardDOM);
};

function displayPhotographerMedia(photographerMedia) {
    let nodes = document.querySelector('.photograph-media');
    nodes.innerHTML = "";
    let counter = 0;
    
    photographerMedia.forEach((photographer) => {
        let template = new PhotographerCard(photographer);
        const userCardDOM = template.createPhotographerMedia(counter);
        nodes.append(userCardDOM);
        counter++;
    })
};

function displayPhotographerCarousel(photographerMedia) {
    let nodes = document.querySelector('.carousel');
    let nodes2 = document.querySelector('.carousel').children;

    
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
    displayNewMedia(photographerMediaByID);
};

init();