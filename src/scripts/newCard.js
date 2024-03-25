import { cardTemplate, polaroidTemplate, iconTemplate } from "../index.js";
import { getRandomNumberNotZero } from "./utilits.js";
import { parametersIcons } from "./icons.js";

//rendering list of parameters of place
export const renderIconList = (item, cardIconList) => {
  Object.keys(item.parameters).forEach((parameter) => {
    const renderIcon = (parameter) => {
      const icon = iconTemplate
        .querySelector(".places__description_icon_item")
        .cloneNode(true);
      const iconImage = icon.querySelector(".places__description_icon_img");

      if (item.parameters[parameter]) {
        const parameterIcon = parametersIcons[parameter];
        if (parameterIcon) {
          iconImage.src = parameterIcon;
          return icon;
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    const icon = renderIcon(parameter);
    if (icon) {
      cardIconList.append(icon);
    }
  });
};

//making a new card
export const addNewCard = (item, language) => {
  const cardElement = cardTemplate
    .querySelector(".places__list_item")
    .cloneNode(true);
  const cardPlaceTitle = cardElement.querySelector(".places__list_title");
  const cardPlaceDescription = cardElement.querySelector(".places__list_text");
  const cardIconList = cardElement.querySelector(".places__description_icons");
  const placesPaperClip = cardElement.querySelector(".places__paper-clip");

  renderIconList(item, cardIconList);

  //making maximum 3 picturies for card
  for (let i = 0; i < 3; i++) {
    const polaroidElemnt = polaroidTemplate.cloneNode(true);
    const placesPolaroidList = cardElement.querySelector(
      ".places__polaroid_list"
    );
    const cardImage = polaroidElemnt.querySelector(".places__list_image");
    const cardImageTitle = polaroidElemnt.querySelector(
      ".places__polaroid_title"
    );
    const cardPolaroidBlock = polaroidElemnt.querySelector(
      ".places__polaroid_photo"
    );
    if (item.photos[i]) {
      cardImage.src = item.photos[i].photoWay;
      cardImageTitle.textContent = item.photos[i].photoName;
      placesPolaroidList.append(polaroidElemnt);

      cardPolaroidBlock.style.setProperty(
        "transform",
        `rotate(${getRandomNumberNotZero(-5, 5)}deg`
      );
    }
  }

  cardPlaceTitle.textContent = item["placeName" + language];
  cardPlaceDescription.textContent = item["shortDescription" + language];

  //random tilt and position for paperclip
  placesPaperClip.style.setProperty(
    "transform",
    `rotate(${getRandomNumberNotZero(-4, 4)}deg`
  );

  placesPaperClip.style.setProperty(
    "left",
    `${getRandomNumberNotZero(80, 110)}px`
  );

  //opening modal with full info about place
  cardElement.addEventListener("click", () => {
    const dialog = document.querySelector(".dialog");
    const modalCardImage = document.querySelector(".places__list_image_dialog");
    const modalCardImageTitle = document.querySelector(
      ".places__polaroid_title_dialog"
    );
    const modalCardPlaceTitle = document.querySelector(
      ".places__list_title_dialog"
    );
    const modalCardPlaceDescription = document.querySelector(
      ".places__list_text_dialog"
    );

    modalCardImage.src = item.photos[0].photoWay;
    modalCardImageTitle.textContent = item.photos[0].photoName;
    modalCardPlaceTitle.textContent = item.placeName;
    modalCardPlaceDescription.textContent = item.shortDescription;

    dialog.showModal();
  });

  return cardElement;
};

