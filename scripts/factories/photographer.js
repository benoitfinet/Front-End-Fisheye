class photographerFactory {
    constructor(photographer) {
        this._photographer = photographer
        this.$wrapperHome = document.createElement('div')
        this.$wrapperPage = document.createElement('div')
    }

    createPhotographerHome() {
        const photographer = `
        <a href ='photographer.html?id=${this._photographer.id}' aria-label='Lien vers la page de ${this._photographer.name}'>
            <article>
                <img src='../assets/photographers/${this._photographer.portrait}' alt='Photo de ${this._photographer.name}'>
                <h2>${this._photographer.name}</h2>
                <h3>${this._photographer.city + ', ' + this._photographer.country}</h3>
                <p>${this._photographer.tagline}</p>
                <span>${this._photographer.price}€/jour</span>
            </article>
        </a>
        `
        this.$wrapperHome.innerHTML = photographer

        return this.$wrapperHome
    }

    createPhotographerPage() {
        const photographer = `
        <a href ='photographer.html?id=${this._photographer.id}' aria-label='Lien vers la page de ${this._photographer.name}'>
            <article>
                <img src='../assets/photographers/${this._photographer.portrait}' alt='Photo de ${this._photographer.name}'>
                <h2>${this._photographer.name}</h2>
                <h3>${this._photographer.city + ', ' + this._photographer.country}</h3>
                <p>${this._photographer.tagline}</p>
                <span>${this._photographer.price}€/jour</span>
            </article>
        </a>
        `
        this.$wrapperPage.innerHTML = photographer

        return this.$wrapperPage
    }
}

export {photographerFactory};