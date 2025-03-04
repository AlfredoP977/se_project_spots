export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  savedData: {
    name: ".profile__name",
    about: ".profile__description",
  },
  userInput: {
    name: "#profile-name-input",
    about: "#profile-description-input",
  },
};
//error msg
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgId);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};
//hide error msg
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

//if invalid input show else hide
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

//looks for invalid input
const hasInvalidInput = (inputList) => {
  console.log();
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};
//check change on edit module
function checkForChange(config) {
  const savedData = {
    name: document.querySelector(config.savedData.name).textContent,
    about: document.querySelector(config.savedData.about).textContent,
  };
  const userInput = {
    name: document.querySelector(config.userInput.name).value,
    about: document.querySelector(config.userInput.about).value,
  };
  const isEditModalOpened = document
    .querySelector("#edit-profile-modal")
    .classList.contains("modal_opened");

  //if all inputs are the same as the placeholder of the inputs return
  if (
    userInput.name === savedData.name &&
    userInput.about === savedData.about &&
    isEditModalOpened
  ) {
    return true;
  }
  return false;
}
//toggle button state
const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList) || checkForChange(config)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

//listner for valid input
const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  // todo intial states check input variable

  if (inputList.length === 0) {
    return; // Ignore forms with only buttons and no input elements
  }
  // checkForChange(config);
  //check edit modul for if it has two place holder that are the same as current value

  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const resetValidation = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};
