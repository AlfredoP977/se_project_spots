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
export function disableButton(buttonEl, config) {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
}

//looks for invalid input
const hasInvalidInput = (inputList) => {
  console.log("inputList", inputList);
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};
//toggle button state
const toggleButtonState = (inputList, buttonEl, config) => {
  console.log("2");
  if (buttonEl === null) {
    return;
  }
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  const textContent = [
    document.querySelector(config.savedData.name).textContent,
    document.querySelector(config.savedData.about).textContent,
  ];
  const getInputValues = (inputList) => {
    const values = inputList.map((inputEl) => inputEl.value);
    return values;
  };
  // for the live of me i cant figure out a way to open it and have it disabled
  if (
    hasInvalidInput(inputList) ||
    arraysEqual(getInputValues(inputList), textContent)
  ) {
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
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};
