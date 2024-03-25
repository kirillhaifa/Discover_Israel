export const traslatableElements = {};

class TranslatableElement {
  cssClassName;
  reversable;
  hebrewValue;
  russianValue;
  englishValue;
  element;
  static totalElements = 0;

  constructor(
    cssClassName,
    reversable,
    hebrewValue,
    russianValue,
    englishValue
  ) {
    this.cssClassName = cssClassName;
    this.reversable = reversable;
    this.hebrewValue = hebrewValue;
    this.russianValue = russianValue;
    this.englishValue = englishValue;
    TranslatableElement.totalElements++
  }

  findElement() {
    this.element = document.querySelector(`${this.cssClassName}`);
    return this;
  }

  changeDirection() {
    if (this.reversable === true) {
      this.element.style.direction = "ltr";
    }
    return this;
  }

  setLanguageValue(language) {
    let value;
    switch (language) {
      case "hebrew":
        value = this.hebrewValue;
        break;
      case "russian":
        value = this.russianValue;
        break;
      case "english":
        value = this.englishValue;
        break;
    }
    this.element.textContent = value;
    return this;
  }

  setPlaceHolderValue(language) {
    if (this.element.placeholder) {
      let value;
      switch (language) {
        case "hebrew":
          value = this.hebrewValue;
          break;
        case "russian":
          value = this.russianValue;
          break;
        case "english":
          value = this.englishValue;
          break;
      }
      this.element.placeholder = value;
      return this;
    }
  }
}

// Фабрика для создания экземпляров TranslatableElement и добавления их в traslatableElements
class TranslatableElementFactory {
  static createAndAddToTranslatableElements(
    cssClassName,
    reversable,
    hebrewValue,
    russianValue,
    englishValue
  ) {
    const element = new TranslatableElement(
      cssClassName,
      reversable,
      hebrewValue,
      russianValue,
      englishValue
    );
    traslatableElements[cssClassName] = element;
    return element;
  }
}

//const headerTitle =
//  TranslatableElementFactory.createAndAddToTranslatableElements(
//   ".header__title",
//    false,
//    "תגלה את ישראל",
//    "Открой для себя Израиль",
//    "Discover Israel"
//  );

const headerDescription =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".header__description",
    false,
    "מקומות בישראל, בהם ביקרתי ויכול להמליץ לכם לבקר",
    "Места в Израиле, которые мы посетили и можем рекомендовать",
    "Places in Israel, which I visited and can recommend you to visit"
  );

const mainPageLink =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".nav__list_item_main",
    false,
    "עמוד ראשי",
    "Главная страница",
    "Main page"
  );

const mapButtonLink =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".nav__list_item_map",
    false,
    "מפה",
    "Карта",
    "Map"
  );

const unsafeLink =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".nav__list_item_unsafe",
    false,
    "לא בטוח לישראלים",
    "Небезопасно для Израильтян",
    "Unsafe for Israelis"
  );

const aboutLink = TranslatableElementFactory.createAndAddToTranslatableElements(
  ".nav__list_item_about",
  false,
  "לגבי הפרויקט",
  "О проекте",
  "About project"
);

const contactLink =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".nav__list_item_contacte",
    false,
    "צור קשר",
    "Контакты",
    "Contact us"
  );

const grillCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_grill",
    false,
    "מקום לגריל",
    "Место для гриля",
    "Place for grill"
  );

const hikingCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_hiking",
    false,
    "טיול רגלי",
    "Хайкинг",
    "Hiking"
  );

const viewCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_view",
    false,
    "נוף מרהיב",
    "Живописный вид",
    "Spectacular view"
  );

const transportCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_transport",
    false,
    "תחבורה ציבורית",
    "Общественный транспорт",
    "Public transport"
  );

const beachCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_beach",
    false,
    "רגיעה בחוף",
    "Пляжный отдых",
    "Beach relaxation"
  );

const hisoricalCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_historical",
    false,
    "מקום היסטורי",
    "Историческое место",
    "Historical place"
  );

const freeCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_free",
    false,
    "חינם",
    "Бесплатно",
    "Free"
  );

const petsCheckbox =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".parameters__button_text_pets",
    false,
    "זמין עם חיות מחמד",
    "Доступно с животными",
    "Available with pets"
  );

const searchInput =
  TranslatableElementFactory.createAndAddToTranslatableElements(
    ".header__search_input",
    false,
    "למצוא מקום",
    "Найти место",
    "Find place"
  );

  console.log(`количество переводимых элементов - ${TranslatableElement.totalElements}`)