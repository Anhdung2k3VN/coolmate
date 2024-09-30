const sliderItem = document.querySelectorAll(".slider-item");
for (let i = 0; i < sliderItem.length; i++) {
  sliderItem[i].style.left = i * 100 + "%";
}

const slider = document.querySelector(".slider-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let counter = 0;
next.addEventListener("click", () => {
  counter++;
  carousel();
});
prev.addEventListener("click", () => {
  counter--;
  carousel();
});
function carousel() {
  if (counter < 0) {
    counter = sliderItem.length - 1;
  }
  if (counter === sliderItem.length) {
    counter = 0;
  }
  slider.style.transform = "translateX(" + -counter * 100 + "%)";
}

//menu bar
const menu = document.querySelector(".header-bar-icon");
const nav = document.querySelector(".header-nav");
menu.addEventListener("click", () => {
  nav.classList.toggle("active");
});
