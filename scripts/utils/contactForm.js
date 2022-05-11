var main = document.getElementById("main");
var modal = document.getElementById("contact_modal");
var crossCloseModal = document.getElementById("crossCloseModal");

function displayModal() {
	modal.style.display = "block";
    main.style.pointerEvents = "none";
    main.style.opacity = 0.2;
    modal.setAttribute('aria-hidden', 'false');
    
}

function closeModal() {
    modal.style.display = "none";
    main.style.pointerEvents = "auto";
    main.style.opacity = 1;
    modal.setAttribute('aria-hidden', 'true');
}