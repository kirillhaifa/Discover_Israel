import { placesBasis } from "./scripts/placeBasis.js";
import { parametersIcons } from "./scripts/icons.js";

const cardTemplate = document.querySelector("#card__template").content;
const iconTemplate = document.querySelector("#icon__template").content;
const polaroidTemplate = document.querySelector("#polaroid__template").content;
const placesList = document.querySelector(".places__list");
const languageButtonHebrew = document.querySelector(
  ".header__language_button_hebrew"
);
const languageButtonEnglish = document.querySelector(
  ".header__language_button_english"
);
const languageButtonRussain = document.querySelector(
  ".header__language_button_russian"
);
const headerTittle = document.querySelector(".header__title");
const headerDescription = document.querySelector(".header__description");
const body = document.querySelector(".body");
const main = document.querySelector(".main");
const dialog = document.querySelector("#dialog");

const renderIconList = (item, cardIconList) => {
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
    if (icon !== null) {
      cardIconList.append(icon);
    }
  });
};

const addNewCard = (item, language) => {
  const cardElement = cardTemplate
    .querySelector(".places__list_item")
    .cloneNode(true);
  const cardPlaceTitle = cardElement.querySelector(".places__list_title");
  const cardPlaceDescription = cardElement.querySelector(".places__list_text");
  const cardIconList = cardElement.querySelector(".places__description_icons");
  const placesPaperClip = cardElement.querySelector(".places__paper-clip");


  renderIconList(item, cardIconList);

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

  cardPlaceTitle.textContent = item['placeName' + language];
  cardPlaceDescription.textContent = item['shortDescription' + language];

  placesPaperClip.style.setProperty(
    "transform",
    `rotate(${getRandomNumberNotZero(-4, 4)}deg`
  );

  placesPaperClip.style.setProperty(
    "left",
    `${getRandomNumberNotZero(80, 110)}px`
  );

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

placesBasis.forEach((placeObjeсt) => {
  placesList.append(addNewCard(placeObjeсt, 'English'));
  body.classList.add("english");
});

languageButtonHebrew.addEventListener("click", () => {
  placesList.innerHTML = "";
  main.style.direction = "rtl";

  headerTittle.textContent = "תגלה את ישראל";
  headerDescription.textContent =
    "מקומות בישראל, בהם ביקרתי ויכול להמליץ לכם לבקר";

  placesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, 'Hebrew'));
    if (body.classList.contains("english")) {
      body.classList.remove("english");
    }
    body.classList.add("hebrew");
  });
});

languageButtonEnglish.addEventListener("click", () => {
  placesList.innerHTML = "";
  main.style.direction = "ltr";

  headerTittle.textContent = "Discover Israel";
  headerDescription.textContent =
    "Places in Israel, which I visited and can recommend you to visit";

  placesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, 'English'));
    if (body.classList.contains("hebrew")) {
      body.classList.remove("hebrew");
    }
    body.classList.add("english");
  });
});

languageButtonRussain.addEventListener("click", () => {
  placesList.innerHTML = "";
  main.style.direction = "ltr";

  headerTittle.textContent = "Открой для себя Израиль";
  headerDescription.textContent =
    "Места в Израиля, которые мы посетили и можем рекомендовать";

  placesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, 'Russian'));
    if (body.classList.contains("hebrew")) {
      body.classList.remove("hebrew");
    }
    body.classList.add("english");
  });
});

//random number but not zero
function getRandomNumberNotZero(min, max) {
  let number = 0;
  while (number === 0) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return number;
}
