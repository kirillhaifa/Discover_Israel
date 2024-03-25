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


//попытка сделать отрисовку по 10 карточек при появлении на экране футтера.
//не стыкуется с фильтрами

//rendering cards on first loading
// Глобальные переменные для отслеживания текущей позиции и массива мест
//let currentPosition = 0;
//const batchSize = 10; // Размер пакета для обработки

// Функция для обработки следующего пакета элементов
//function processNextBatch() {
//    const remainingPlaces = filteredPlacesBasis.length - currentPosition;
//    const batch = placesBasis.slice(currentPosition, currentPosition + Math.min(batchSize, remainingPlaces));
//    batch.forEach((placeObject) => {
//        let language = languagesForm.elements["language"].value;
//        placesList.append(addNewCard(placeObject, `${language}`));
//        body.classList.add(`${language.toLowerCase()}`);
//    });
//  currentPosition += batchSize;
//}

// Вызываем функцию для обработки первых 10 элементов
//processNextBatch();

//window.addEventListener('scroll', () => {
//  if (isElementInViewport(footer)) {
//    processNextBatch();
// }
//});


function processNextBatch() {
  const batchSize = 10;
  const remainingPlaces = filteredPlacesBasis.length - currentPosition;
  const batch = filteredPlacesBasis.slice(
    currentPosition,
    currentPosition + Math.min(batchSize, remainingPlaces)
  );
  batch.forEach((placeObject) => {
    let language = languagesForm.elements["language"].value;
    placesList.append(addNewCard(placeObject, `${language}`));
    body.classList.add(`${language.toLowerCase()}`);
  });
  let currentPosition = currentPosition + batchSize;
}

function handleFooterInVeiwport() {
  if (isElementInViewport(footer)) {
    processNextBatch();
  }
}


function renderCards() {
  let currentPosition = 0

  placesList.innerHTML = "";
  filterBasisAccordingParameters();
  filterBasisAccordingSearch();
  processNextBatch()
  window.addEventListener("scroll", handleFooterInVeiwport);
}
