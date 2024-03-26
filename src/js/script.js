const sliderInput = document.querySelector(".slider-input");
const placeholderInput = document.querySelector(".month-input");
const sumInput = document.querySelector(".sum-input");

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
function updateStep(value) {
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
    this.value = this.value.slice(0, 2);
  }
});

placeholderInput.addEventListener("change", function () {
  const inputValue = parseInt(this.value);

  // Округляем ввод до ближайшего значения из диапазона
  let roundedValue;
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

  // Обновляем значение ползунка
  let a = (placeholderInput.placeholder = roundedValue + " месяцев");
  sliderInput.value = roundedValue;
  placeholderInput.value = a;

  const e =
    ((sliderInput.value - sliderInput.min) /
      (sliderInput.max - sliderInput.min)) *
    100;
  sliderInput.style.background = `linear-gradient(to right, #00d8d8 ${e}%, #f5f5f7 ${e}%)`;
});

const tabItems = document.querySelectorAll(".tab-container__item");
const summ = document.querySelector(".count__value-summ");
const result = document.querySelector(".count__value-result");

// Обработчик события изменения поля ввода sumInput
sumInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const activeTab = document.querySelector(".tab-active");
  const activeTabValue = parseInt(activeTab.dataset.value);

  if (inputValue === "") {
    summ.textContent = activeTabValue;
    calculate(result, activeTabValue);
  } else {
    summ.textContent = inputValue;
    calculate(result, parseInt(sumInput.value));
  }
});

// Обработчик события изменения поля ввода sumInput (если пользователь ввел значение и потерял фокус с поля ввода)
sumInput.addEventListener("change", function (event) {});

// Добавляем обработчик события клика для каждого элемента
tabItems.forEach(function (item) {
  item.addEventListener("click", function () {
    tabItems.forEach(function (tabItem) {
      tabItem.classList.remove("tab-active");
    });

    this.classList.add("tab-active");
    sumInput.placeholder = item.dataset.value;
    summ.textContent = item.dataset.value;

    calculate(result, parseInt(sumInput.placeholder));
  });
});

// Функция calculate
function calculate(result, summ) {
  const AdditionalPercent = 20;
  const Percent = 15;

  const Additional = summ * (AdditionalPercent / 100);
  const PercentDecimal = Percent / 100;

  const resultSumm = summ + Additional + (summ + Additional) * PercentDecimal;
  result.textContent = resultSumm;
}
