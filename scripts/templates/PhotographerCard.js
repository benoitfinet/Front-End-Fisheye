export class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer
    }

    createPhotographerHome() {

        let wrapperHome = document.createElement('div')
        
        
        const photographer = `
        <a href ='photographer.html?id=${this.photographer.id}' aria-label='Lien vers la page de ${this.photographer.name}'>
            <article>
                <img src='../assets/photographers/${this.photographer.portrait}' alt='Photo de ${this.photographer.name}'>
                <h2>${this.photographer.name}</h2>
                <h3>${this.photographer.city + ', ' + this.photographer.country}</h3>
                <p>${this.photographer.tagline}</p>
                <span>${this.photographer.price}€/jour</span>
            </article>
        </a>
        `
        wrapperHome.innerHTML = photographer

        return wrapperHome
    }

    createPhotographerPage() {

        let wrapperPage = document.createElement('div')
        wrapperPage.classList.add("photograph-header__div")

        const photographer = `
            <article>
                <div>
                    <h1>${this.photographer.name}</h1>
                    <h2>${this.photographer.city + ', ' + this.photographer.country}</h2>
                    <p>${this.photographer.tagline}</p>
                </div>
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                <img src='../assets/photographers/${this.photographer.portrait}' alt='Photo de ${this.photographer.name}'>
            </article>
            <div class="priceInformation">
                <p>Likes <i class="fa-solid fa-heart"></i></p>
                <p>${this.photographer.price}€ / jour</p>
            </div>
        `
        wrapperPage.innerHTML = photographer

        return wrapperPage
    }

    createPhotographerMedia() {

        let wrapperMedia = document.createElement('div')

        const photographer = `
            <article>
                ${this.photographer.image.includes('jpg') ? `<a onclick="displayCarousel()"><img src='${this.photographer.image}'/></a>` : this.photographer.video.includes("mp4") ? `<a onclick="displayCarousel()"><video src='${this.photographer.video}' controls ></video></a>` :  null}
                <div class="textMedia">
                    <p class="textMedia__title">${this.photographer.title}</p>
                    <p class="textMedia__likes">${this.photographer.likes}</p>
                    <i class="fa-regular fa-heart fa-xl textMedia__icon"></i>
                </div>
            </article>
        `
        wrapperMedia.innerHTML = photographer

        return wrapperMedia
    }

    createPhotographerCarousel() {

        let wrapperCarousel = document.createElement('li');
        wrapperCarousel.classList.add("liCarousel");

        const photographer = `
                    ${this.photographer.image.includes('jpg') ? `<img src='${this.photographer.image}'/>` : this.photographer.video.includes("mp4") ? `<video src='${this.photographer.video}' controls ></video>` :  null}
        `
        wrapperCarousel.innerHTML = photographer

        return wrapperCarousel
    }
}