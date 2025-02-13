//todo pass validation items
import { enableValidation, settings, resetValidation } from "./validation";
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
//profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalEditProfileCloseButton =
  editProfileModal.querySelector(".modal__close-btn");
//form elements
const editModal = document.querySelector("#edit-profile-modal");
const profileName = document.querySelector(".profile__name");
const editFormElement = document.querySelector(".modal__form");
const editModalNameInput = document.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//Card modal
const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseBtns = cardModal.querySelector(".modal__close-btn");
const cardModelButton = document.querySelector(".profile__add-btn");

const cardForm = cardModal.querySelector(".modal__form");
//card modal elements
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
//card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

//selectmodal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = document.querySelector(".modal__image");
const previewModalCaptionElement = document.querySelector(".modal__caption");
const modalImageCloseButton = document.querySelector(
  ".modal__close-btn-preview"
);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(cardModal);
  evt.target.reset();
  toggleButtonState(
    Array.from(cardForm.querySelectorAll(settings.inputSelector)),
    cardForm.querySelector(settings.submitButtonSelector),
    settings
  );
}

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardLinkEl = cardElement.querySelector(".card__image");
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  const cardlikeBtn = cardElement.querySelector("#likeButton");
  //card__like-button_active
  cardlikeBtn.addEventListener("click", () => {
    cardlikeBtn.classList.toggle("card__like-button_active");
  });

  const deleteBtn = cardElement.querySelector("#deleteBtn");
  deleteBtn.addEventListener("click", () => {
    {
      cardElement.remove();
    }
  });

  cardLinkEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageElement.src = data.link;
    previewModalImageElement.alt = data.name;
    previewModalCaptionElement.textContent = data.name;
  });
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("click", handleOverlayClick);
}
function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) {
      closeModal(modal);
    }
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
  toggleButtonState(
    Array.from(cardForm.querySelectorAll(settings.inputSelector)),
    cardForm.querySelector(settings.submitButtonSelector),
    settings
  );
}
// modalImageCloseButton.addEventListener("click", () => {
//   closeModal(previewModal);
// });

profileEditButton.addEventListener("click", () => {
  openModal(editModal);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, settings);
});

// modalEditProfileCloseButton.addEventListener("click", () => {
//   closeModal(editModal);
// });

cardModelButton.addEventListener("click", () => {
  openModal(cardModal);
});

const modalCloseBtns = document.querySelectorAll(".modal__close-btn");

modalCloseBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// cardModalCloseBtn.addEventListener("click", () => {
//   closeModal(cardModal);
// });
editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});

enableValidation(settings);
