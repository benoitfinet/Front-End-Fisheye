import { photographerFactory } from "../factories/photographer.js";

export async function getPhotographers() {
    let data = await fetch('/data/photographers.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        return data
    })
    .catch(error => {
        console.log(error)
    })

    let dataPhotographers = data.photographers;
    
    let photographers = [];
    
    dataPhotographers.forEach((item) => {
        const photographe = new photographerFactory(item, "json")
        photographers.push(photographe)
    })

    return photographers
}
    
async function displayPhotographersHomeData(item) {
    let nodes = document.querySelector('.photographer_section');
    
    item.forEach((photographer) => {
        const userCardDOM = photographer.createPhotographerHome();
        nodes.append(userCardDOM);
    });
};

async function displayPhotographersPageData() {
    const photographersD = await getPhotographers();
    let nodes = document.querySelector('.photograph-header');
    
    var url_string = window.location.href
    var objectURL = new URL(url_string);
    var pageID = objectURL.searchParams.get("id");
    
    let photographerByID = null
    
    photographersD.forEach((photographer) => {
        if(photographersD.id === pageID) {
            photographerByID = photographersD
            const userCardDOM = photographer.createPhotographerPage();
            nodes.append(userCardDOM);
        }
    });
};

async function init() {
    const photographers = await getPhotographers();
    const photographerByID = await displayPhotographersPageData();
    
    displayPhotographersHomeData(photographers);
    displayPhotographersPageData(photographerByID);
};

init();