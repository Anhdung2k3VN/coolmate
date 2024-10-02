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
// product detail
const imageSmall = document.querySelectorAll(".product-image-items img");
const imageBig = document.querySelector(".product-image-main");
for (let i = 0; i < imageSmall.length; i++) {
  imageSmall[i].addEventListener("click", () => {
    imageBig.src = imageSmall[i].src;
    imageSmall[i].classList.add("active");
    for (let j = 0; j < imageSmall.length; j++) {
      if (i !== j) {
        imageSmall[j].classList.remove("active");
      }
    }
  });
}
// quantity product
document.querySelector(".ri-add-line").addEventListener("click", () => {
  document.querySelector(".quantity-input").value++;
});
document.querySelector(".ri-subtract-fill").addEventListener("click", () => {
  if (document.querySelector(".quantity-input").value > 1) {
    document.querySelector(".quantity-input").value--;
  }
});
