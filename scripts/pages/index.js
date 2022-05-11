import { PhotographerFactory } from "../factories/PhotographerFactory.js";
import { PhotographerCard } from "../templates/PhotographerCard.js";

async function getPhotographers() {
    let data = await fetch('/data/photographers.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
    
    let photographers = [];
    
    data.photographers.forEach((item) => {
        const photographe = new PhotographerFactory(item, "json")
        photographers.push(photographe)
    })

    return photographers
}
    
async function displayPhotographersHomeData(photographerItems) {
    let nodes = document.querySelector('.photographer_section');
    
    photographerItems.forEach((photographer) => {
        
        let template = new PhotographerCard(photographer)
        const userCardDOM = template.createPhotographerHome();
        nodes.append(userCardDOM);
    });
};

async function init() {
    const photographers = await getPhotographers();
    displayPhotographersHomeData(photographers);
};

init();