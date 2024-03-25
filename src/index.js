import { placesBasis } from "./scripts/placeBasis.js";
import { shuffleArray, isElementInViewport } from "./scripts/utilits.js";
import { addNewCard } from "./scripts/newCard.js";
import { traslatableElements } from "./scripts/translation.js";
import { unsafePlacesBasis } from "./scripts/unsafe.js";

export const cardTemplate = document.querySelector("#card__template").content;
export const iconTemplate = document.querySelector("#icon__template").content;
export const mapTemplate = document.querySelector("#map__template").content;
export const languagesForm = document.querySelector(".header__languages");
export const polaroidTemplate = document.querySelector(
  "#polaroid__template"
).content;
const placesList = document.querySelector(".places__list");
const body = document.querySelector(".body");
const main = document.querySelector(".main");
const parametersForm = document.querySelector(".parameters_form");
const parametersCheckBoxes = document.querySelectorAll(
  ".parameters_form_checkbox"
);
const headerSearchContainer = document.querySelector(".header__search");
const searchInput = document.querySelector(".header__search_input");
const mapButton = document.querySelector(".button__map");
const footer = document.querySelector(".footer");
const unsafeButton = document.querySelector(".nav__list_item_unsafe");

let filteredPlacesBasis = shuffleArray(placesBasis);
let language = languagesForm.elements["language"].value;

//render pn first loading
body.classList.add(`${language.toLowerCase()}`);
filteredPlacesBasis.forEach((placeObjeсt) => {
  placesList.append(addNewCard(placeObjeсt, `${language}`));
});

function renderCards() {
  placesList.innerHTML = "";
  filterBasisAccordingParameters();
  filterBasisAccordingSearch();
  let language = languagesForm.elements["language"].value;

  filteredPlacesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, `${language}`));
  });
}

//filter for basis according parameters
const filterBasisAccordingParameters = () => {
  filteredPlacesBasis = placesBasis;

  for (let i = 0; i < parametersCheckBoxes.length; i++) {
    if (parametersCheckBoxes[i] && parametersCheckBoxes[i].checked) {
      filteredPlacesBasis = filteredPlacesBasis.filter(
        (place) => Object.values(place.parameters)[i] === true
      );
    }
  }

  return filteredPlacesBasis;
};

//rendering cards on checkbox chenges
parametersCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    renderCards();
    if (filteredPlacesBasis.length === 0) {
      placesList.innerHTML = "<p>ничего не найдено</p>";
    }
  });
});

const filterBasisAccordingSearch = () => {
  let regex = new RegExp(".*" + searchInput.value + ".*", "i");

  if (searchInput.value.length >= 3) {
    filteredPlacesBasis = filteredPlacesBasis.filter((place) => {
      return (
        regex.test(place.placeNameEnglish) ||
        regex.test(place.placeNameHebrew) ||
        regex.test(place.placeNameRussian) ||
        regex.test(place.shortDescriptionEnglish) ||
        regex.test(place.shortDescriptionHebrew) ||
        regex.test(place.shortDescriptionRussian)
      );
    });

    return filteredPlacesBasis;
  }
};

//search
searchInput.addEventListener("input", function () {
  renderCards();
});

//switching languages
languagesForm.addEventListener("change", () => {
  renderCards();

  //translate all translatable obects
  let language = languagesForm.elements["language"].value;
  for (const key in traslatableElements) {
    if (traslatableElements.hasOwnProperty(key)) {
      traslatableElements[key]
        .findElement()
        .changeDirection()
        .setLanguageValue(language.toLowerCase())
        .setPlaceHolderValue(language.toLowerCase());
    }
  }
  switchFont(language);
});

//map
mapButton.addEventListener("click", function () {
  if (!main.querySelector(".map")) {
    parametersForm.innerHTML = "";
    headerSearchContainer.innerHTML = "";
    placesList.setAttribute("style", "margin: 0px");
    const map = mapTemplate.cloneNode(true);
    placesList.innerHTML = "";
    main.append(map);
  }
});

const switchFont = (language) => {
  switch (language) {
    case "Hebrew":
      body.style.direction = "rtl";
      body.classList.remove("english");
      body.classList.add("hebrew");
      break;
    case "English":
    case "Russian":
      body.style.direction = "ltr";
      if (body.classList.contains("hebrew")) {
        body.classList.remove("hebrew");
        body.classList.add("english");
      }
      break;
    default:
      console.log("smth wrong");
      break;
  }
};

unsafeButton.addEventListener("click", function () {
  
  placesList.innerHTML = "";
  let language = languagesForm.elements["language"].value;

  unsafePlacesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, `${language}`));
  });
});
