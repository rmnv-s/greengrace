const sliderInput = document.querySelector(".slider-input");

function updateSliderRangeBackground() {
  const e =
    ((sliderInput.value - sliderInput.min) /
      (sliderInput.max - sliderInput.min)) *
    100;
  sliderInput.style.background = `linear-gradient(to right, #00d8d8 ${e}%, #f5f5f7 ${e}%)`;
}
sliderInput.addEventListener("input", updateSliderRangeBackground);

updateSliderRangeBackground();

//
const placeholderInput = document.querySelector(".month-input");
function updateStep(value) {
  // var slider = document.querySelector(".slider-input");
  const numericValue = parseInt(value);
  let stepValue;
  let placeholderValue;
  if (numericValue >= 0 && numericValue < 6) {
    stepValue = 6;
    placeholderValue = 0;
  } else if (numericValue >= 6 && numericValue < 12) {
    stepValue = 6;
    placeholderValue = 6;
  } else if (numericValue >= 12 && numericValue < 24) {
    stepValue = 12;
    placeholderValue = 12;
  } else if (numericValue >= 24 && numericValue < 36) {
    stepValue = 12;
    placeholderValue = 24;
  } else if (numericValue >= 36 && numericValue < 48) {
    stepValue = 12;
    placeholderValue = 36;
  } else if (numericValue === 48) {
    stepValue = 12;
    placeholderValue = 48;
  }

  sliderInput.step = stepValue;
  sliderInput.value = placeholderValue;
  placeholderInput.placeholder = placeholderValue + " месяцев";
}

placeholderInput.addEventListener("input", function () {
  if (this.value.length > 2) {
    this.value = this.value.slice(0, 2); // Обрезаем значение до 4 символов
  }
});

placeholderInput.addEventListener("change", function () {
  // var inputValue = parseInt(this.value); // Преобразуем значение в число
  var inputValue = this.value; // Преобразуем значение в число

  // Округляем ввод до ближайшего значения из диапазона
  var roundedValue;
  if (inputValue <= 6) {
    roundedValue = 6;
  } else if (inputValue <= 12) {
    roundedValue = 12;
  } else if (inputValue <= 24) {
    roundedValue = 24;
  } else if (inputValue <= 36) {
    roundedValue = 36;
  } else {
    roundedValue = 48;
  }

  // Обновляем значение в поле ввода с добавлением "месяцев"
  this.value = roundedValue;

  // Обновляем значение ползунка
  sliderInput.value = roundedValue;
  // placeholderInput.placeholder.value = roundedValue + " месяцев";
  placeholderInput.value = roundedValue + " месяцев";
});
