const sliderItem = document.querySelectorAll(".slider-item");
for (let i = 0; i < sliderItem.length; i++) {
  sliderItem[i].style.left = i * 100 + "%";
}

const slider = document.querySelector(".slider-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
if (next != null && prev != null) {
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
}

//menu bar
const menu = document.querySelector(".header-bar-icon");
const nav = document.querySelector(".header-nav");
menu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

//header scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  header.classList.toggle("sticky", window.scrollY > 0);
});

// document.querySelector(".ri-add-line").addEventListener("click", () => {
//   document.querySelector(".quantity-input").value++;
// });
// document.querySelector(".ri-subtract-fill").addEventListener("click", () => {
//   if (document.querySelector(".quantity-input").value > 1) {
//     document.querySelector(".quantity-input").value--;
//   }
// });
