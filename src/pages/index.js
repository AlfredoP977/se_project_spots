import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../script/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3eb1ae88-bc1c-483c-97a8-5e99ad5e651d",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    console.log(cards);
    console.log(userInfo);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
    profileName.textContent = userInfo.name;
    profileAvatar.src = userInfo.avatar;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

//profile elements
const profileAvatar = document.querySelector(".profile__avatar");
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
//deleteCard modal
const deleteCardModal = document.querySelector("#deleteCard-modal");
const deleteCardButton = deleteCardModal.querySelector(
  ".modal__deleteCard-btn"
);
const cancelDeleteCardButton = deleteCardModal.querySelector(
  ".modal__cancelDeleteCard-btn"
);
const deleteCardForm = deleteCardModal.querySelector(".modal__form");
//avatarModal
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarModelButton = document.querySelector(".profile__avatar-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarForm = avatarModal.querySelector(".modal__form");
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

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  console.log(avatarInput.value);
  api
    .editAvatarUserInfo({
      avatar: avatarInput.value,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch(console.error)
    .finally(() => {
      closeModal(avatarModal);
      evt.target.reset();
      toggleButtonState(
        Array.from(avatarForm.querySelectorAll(settings.inputSelector)),
        avatarForm.querySelector(settings.submitButtonSelector),
        settings
      );
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      //ToDO use data instead of input values
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
      evt.target.reset();
    })
    .catch(console.error);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault(selectedCardId);
  api
    .deleteCard()
    .then((selectedCard) => {
      remove(selectedCard);
      closeModal(deleteCardModal);
    })
    .catch(console.error);
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

  let selectedCard, selectedCardId;
  const deleteBtn = cardElement.querySelector("#deleteBtn");

  deleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );
  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    console.log(cardId);
    openModal(deleteCardModal);
  }
  cancelDeleteCardButton.addEventListener("click", () => {
    {
      closeModal(deleteCardModal);
      cancelDeleteCardButton.removeEventListener;
    }
  });

  cancelDeleteCardButton.addEventListener("click", () => {
    {
      closeModal(deleteCardModal);
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

// let selectedCard, selectedCardId;

// function getCardElement(data) {{
//   deleteButton.addEventListener(
//     "click",
//     (evt) => handleDeleteCard(cardElement, data)
//   );
//   function handleDeleteCard(cardElement, data) {
//     selectedCard = ___;   // Assign the card element to selectedCard
//     selectedCardId = ___; // Assign the card's ID to selectedCardId
//     // open the delete confirmation modal
//     openModal(deleteCardModal);
//   }
//   function handleDeleteSubmit() => {
//     api
//       .removeCard(___) // pass the ID the the api function
//       .then(() => {
//         // remove the card from the DOM
//         // close the modal
//       })
//       .catch(console.error);
//   };
//   deleteForm.addEventListener("submit", handleDeleteSubmit);
// }}

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

profileEditButton.addEventListener("click", () => {
  openModal(editModal);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, settings);
});

cardModelButton.addEventListener("click", () => {
  openModal(cardModal);
});

avatarModelButton.addEventListener("click", () => {
  openModal(avatarModal);
});
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");

modalCloseBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleAddCardFormSubmit);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

deleteCardForm.addEventListener("submit", handleDeleteCardSubmit);

enableValidation(settings);
