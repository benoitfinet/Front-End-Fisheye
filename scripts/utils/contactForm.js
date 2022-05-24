const formMain = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const crossCloseModal = document.getElementById("crossCloseModal");
const buttonSubmit = document.getElementById("buttonSubmit");
const prenomInput = document.getElementById("prenom");
const form = document.getElementById("form");
const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const prenomError = document.getElementById("prenomError");
const nomError = document.getElementById("nomError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function displayModal() {
	modal.style.display = "block";
    formMain.style.pointerEvents = "none";
    modal.setAttribute('aria-hidden', 'false');
    formMain.setAttribute('aria-hidden', 'true');
    formMain.style.visibility = 'hidden';
}

function closeModal() {
    modal.style.display = "none";
    formMain.style.pointerEvents = "auto";
    modal.setAttribute('aria-hidden', 'true');
    formMain.setAttribute('aria-hidden', 'false');
    formMain.style.visibility = 'visible';
}

function animation(input) {
    input.animate([
      { transform: 'translateX(2%)' },
      { transform: 'translateY(2% * -2)' }
    ], {
      duration: 100,
      iterations: 3
    });
  }

function emailValidation(value) {
    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    return regexMail.test(value)
}

function nameValidation(input) {
    return input.value.trim().length >= 2
}

function messageValidation(input) {
    return input.value.trim().length >= 50
}

function validateInput(input, type) {
    let isValid = false;
  
    if(type === "email") {
      isValid = emailValidation(input.value);
    } else if (type === "name") {
      isValid = nameValidation(input);
    } else if (type === "message") {
      isValid = messageValidation(input);
    }
    return isValid;
}

function validate(event) {

    event.preventDefault();
  
    let firstNameValidation = inputValidationDisplay(prenomInput, "name", prenomError);
    let lastNameValidation = inputValidationDisplay(nomInput, "name", nomError);
    let emailValidation = inputValidationDisplay(emailInput, "email", emailError);
    let messageValidation = inputValidationDisplay(messageInput, "message", messageError);
  
    if(firstNameValidation &&
       lastNameValidation &&
       emailValidation &&
       messageValidation) {
        console.log("Prénom :" + " " + prenomInput.value, "Nom :" + " " + nomInput.value, "Email :" + " " + emailInput.value, "Message :" + " " + messageInput.value);
        form.reset();
        closeModal();
       }
  }

  function inputValidationDisplay(input, type, error) {
    let isValid = validateInput(input, type, error);
  
    if(isValid) {
      input.style.border="none";
      error.style.display = "none";
    } else {
      input.style.border="3px outset #fe142f";
      animation(input);
      error.style.display = "block";
    }
    return isValid;
  }

  function inputValidationInstant(input, type, error) {
    let isValid = validateInput(input, type, error);
  
    if(isValid) {
      input.style.border="none";
      error.style.display = "none";
    }
    return isValid;
  }