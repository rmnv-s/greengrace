const sliderInput = document.querySelector(".slider-input");

function updateSliderRangeBackground() {
  const percent =
    ((sliderInput.value - sliderInput.min) /
      (sliderInput.max - sliderInput.min)) *
    100;
  sliderInput.style.background = `linear-gradient(to right, #00d8d8 ${percent}%, #f5f5f7 ${percent}%)`;
}

sliderInput.addEventListener("input", updateSliderRangeBackground);
updateSliderRangeBackground();
