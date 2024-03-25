import { parametersCheckBoxes } from "../index.js";

//filter for basis according parameters
export const filterBasisAccordingParameters = () => {

  for (let i = 0; i < parametersCheckBoxes.length; i++) {
    if (parametersCheckBoxes[i] && parametersCheckBoxes[i].checked) {
      filteredPlacesBasis = filteredPlacesBasis.filter(
        (place) => Object.values(place.parameters)[i] === true
      );
    }
  }

  return filteredPlacesBasis;
};

//filter for basis according search
export const filterBasisAccordingSearch = () => {
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