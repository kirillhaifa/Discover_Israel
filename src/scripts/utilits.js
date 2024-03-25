//random number but not zero
export function getRandomNumberNotZero(min, max) {
  let number = 0;
  while (number === 0) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return number;
}

//to mix array 
export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}


//check if element in veiwport
export function isElementInViewport(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

