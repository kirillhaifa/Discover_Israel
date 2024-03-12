import { placesBasis } from "./scripts/placeBasis.js";
import { shuffleArray } from "./scripts/utilits.js";
import { addNewCard } from "./scripts/newCard.js";

export const cardTemplate = document.querySelector("#card__template").content;
export const iconTemplate = document.querySelector("#icon__template").content;
export const mapTemplate = document.querySelector('#map__template').content;
export const polaroidTemplate = document.querySelector(
  "#polaroid__template"
).content;
const placesList = document.querySelector(".places__list");
const headerTittle = document.querySelector(".header__title");
const headerDescription = document.querySelector(".header__description");
const body = document.querySelector(".body");
const main = document.querySelector(".main");
const headerLogoTextContainer = document.querySelector(
  ".header__logo_text_container"
);
const parametersForm = document.querySelector('.parameters_form')
const parametersCheckBoxes = document.querySelectorAll(
  ".parameters_form_checkbox"
);
export const languagesForm = document.querySelector(".header__languages");
let filteredPlacesBasis = [];
const headerSearchContainer = document.querySelector('.header__search')
const searchInput = document.querySelector(".header__search_input");
const mapButton = document.querySelector('.button__map')

//rendering cards on first loading
shuffleArray(placesBasis).forEach((placeObjeсt) => {
  let language = languagesForm.elements["language"].value;
  placesList.append(addNewCard(placeObjeсt, `${language}`));
  body.classList.add(`${language.toLowerCase()}`);
});

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
    let language = languagesForm.elements["language"].value;
    placesList.innerHTML = "";
    filterBasisAccordingParameters();
    filterBasisAccordingSearch()
    shuffleArray(filteredPlacesBasis).forEach((placeObjeсt) => {
      placesList.append(addNewCard(placeObjeсt, `${language}`));
    });
    if (filteredPlacesBasis.length === 0) {
      placesList.innerHTML = "<p>ничего не найдено</p>";
    }
  });
});

const switchFontAndDirection = (language) => {
  if (language === "Hebrew") {
    main.style.direction = "rtl";
    headerTittle.textContent = "תגלה את ישראל";
    headerDescription.textContent =
      "מקומות בישראל, בהם ביקרתי ויכול להמליץ לכם לבקר";
    if (body.classList.contains("english")) {
      body.classList.remove("english");
    }
    if (!body.classList.contains("hebrew")) {
      body.classList.add("hebrew");
    }
  } else if (language === "English") {
    main.style.direction = "ltr";
    headerTittle.textContent = "Discover Israel";
    headerDescription.textContent =
      "Places in Israel, which I visited and can recommend you to visit";
    if (
      body.classList.contains("hebrew") &&
      !body.classList.contains("english")
    ) {
      body.classList.remove("hebrew");
      body.classList.add("english");
    }
  } else if (language === "Russian") {
    main.style.direction = "ltr";

    headerTittle.textContent = "Открой для себя Израиль";
    headerDescription.textContent =
      "Места в Израиля, которые мы посетили и можем рекомендовать";
    if (
      body.classList.contains("hebrew") &&
      !body.classList.contains("english")
    ) {
      body.classList.remove("hebrew");
      body.classList.add("english");
    }
  }
};

const filterBasisAccordingSearch = () => {
  let regex = new RegExp(".*" + searchInput.value + ".*", "i");

  if (searchInput.value.length >= 3) {
    placesList.innerHTML = "";
    filteredPlacesBasis = filteredPlacesBasis.filter((place) => {
      return (
        regex.test(place.placeNameEnglish) ||
        regex.test(place.placeNameHebrew) ||
        regex.test(place.placeNameRussian)
      );
    });

    return filteredPlacesBasis;
  }
};

//search
searchInput.addEventListener("input", function () {
  placesList.innerHTML = "";
  filterBasisAccordingParameters();
  filterBasisAccordingSearch();
  let language = languagesForm.elements["language"].value;

  filteredPlacesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, `${language}`));
    switchFontAndDirection(language)
  });
});

//switching languages
languagesForm.addEventListener("change", () => {
  placesList.innerHTML = "";
  let language = languagesForm.elements["language"].value;
  filterBasisAccordingParameters();
  filterBasisAccordingSearch()
  filteredPlacesBasis.forEach((placeObjeсt) => {
    placesList.append(addNewCard(placeObjeсt, `${language}`));
    body.classList.add("english");
  });
  if (filteredPlacesBasis.length === 0) {
    placesList.innerHTML = "<p>ничего не найдено</p>";
  }
  switchFontAndDirection(language);
});

//map 
mapButton.addEventListener('click', function() {
  parametersForm.innerHTML = ""
  headerSearchContainer.innerHTML = ""
  const map = mapTemplate.cloneNode(true);
  placesList.innerHTML = "";
  main.append(map)
})


const reversebaleElements = {
  headerLogoTextContainer,
};