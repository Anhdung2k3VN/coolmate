function vnd(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
var productAll = JSON.parse(localStorage.getItem("products")).filter(
  (item) => item.status == 1
);

// onclick="addToCart(${products.masp})"

// // render cart
// function renderCart() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let cartHtml = "";
//   cart.forEach((item) => {
//     cartHtml += `<div class="cart-item">
//     <div class="cart-item-image">
//       <img src="${item.product_image.bigImg}" alt="" />
//     </div>
//     <div class="cart-item-info">
//       <h3>${item.product_name}</h3>
//       <p>${vnd(item.product_price)}</p>
//       <div class="cart-item-quantity">
//         <button onclick="decreaseQuantity('${item.masp}')">-</button>
//         <span>${item.quantity}</span>
//         <button onclick="increaseQuantity('${item.masp}')">+</button>
//       </div>
//     </div>
//     <div class="cart-item-remove">
//       <button onclick="removeItem('${item.masp}')">
//         <i class="fa-solid fa-trash"></i>
//       </button>
//     </div>
//   </div>`;
//   });
//   document.querySelector(".cart-list").innerHTML = cartHtml;
// }
// // remove item
// function removeItem(masp) {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   let newCart = cart.filter((item) => item.masp != masp);
//   localStorage.setItem("cart", JSON.stringify(newCart));
//   renderCart();
//   let cartIcon = document.querySelector(".ri-shopping-cart-line");
//   let currentCount = newCart.reduce((total, item) => total + item.quantity, 0);
//   cartIcon.setAttribute("number", currentCount);
// }
// // increase quantity
// function increaseQuantity(masp) {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   let cartItem = cart.find((item) => item.masp == masp);
//   cartItem.quantity++;
//   localStorage.setItem("cart", JSON.stringify(cart));
//   renderCart();
// }
// // decrease quantity
// function decreaseQuantity(masp) {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   let cartItem = cart.find((item) => item.masp == masp);
//   if (cartItem.quantity > 1) {
//     cartItem.quantity--;
//   } else {
//     cart = cart.filter((item) => item.masp != masp);
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));
//   renderCart();
// }
// // show cart
// function showCart() {
//   renderCart();
// }

// get thong tin san pham
function getProductInfo(masp) {
  let products = JSON.parse(localStorage.getItem("products"));
  return products.find((item) => {
    return item.masp == masp;
  });
}

function renderProducts(showProduct) {
  let productHtml = "";
  showProduct.forEach((products) => {
    productHtml += ` <div class="product-item row-grid">
                  <a href="javascript:;">
                    <div class="product-image">
                      <img
                        src="${products.product_image.bigImg}"
                        alt=""
                      />
                    </div>
                     </a>
                     
                    <div class="product-info">
                    <a href="javascript:;">
                     <h3>${products.product_name}</h3>
                       <span>${products.product_material}</span>
                      <div class="product-price">
                        <p class="price">${vnd(
                          products.product_price
                        )} <del>${vnd(products.product_del)}</del></p>
                      </div>
                     </a>
                      <div  class="buttom-1">
                        <button id="add" onclick="addToCart(${
                          products.masp
                        })"  >
                          <i class="fa-solid fa-cart-plus"></i>
                          <span>add to cart</span>
                        </button>
                      </div>
                    </div>   
              </div>`;
  });

  document.querySelector(".cartegory-right-content-item").innerHTML =
    productHtml;
}

function addToCart(masp) {
  let products = JSON.parse(localStorage.getItem("products"));
  let product = products.find((item) => item.masp == masp);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItem = cart.find((item) => item.masp == masp);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cartItem = { ...product, quantity: 1 };
    cart.push(cartItem);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  let cartIcon = document.querySelector(".ri-shopping-cart-line");
  let currentCount = parseInt(cartIcon.getAttribute("number"));
  currentCount++;
  cartIcon.setAttribute("number", currentCount);
}

// Phân trang
let currentPage = 1;
let perPage = 8;
let totalPage = productAll.length / perPage;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
  let start = (currentPage - 1) * perPage;
  let end = (currentPage - 1) * perPage + perPage;
  let productShow = productAll.slice(start, end);
  renderProducts(productShow);
}

function setupPagination(productAll, perPage) {
  document.querySelector(".page-nav-list").innerHTML = "";
  let page_count = Math.ceil(productAll.length / perPage);
  for (let i = 1; i <= page_count; i++) {
    let li = paginationChange(i, productAll, currentPage);
    document.querySelector(".page-nav-list").appendChild(li);
  }
}
function paginationChange(page, productAll, currentPage) {
  let node = document.createElement(`li`);
  node.classList.add("page-nav-item");
  node.innerHTML = `<a href="javascript:;">${page}</a>`;
  if (currentPage == page) node.classList.add("active");
  node.addEventListener("click", function () {
    currentPage = page;
    displayList(productAll, perPage, currentPage);
    let t = document.querySelectorAll(".page-nav-item.active");
    for (let i = 0; i < t.length; i++) {
      t[i].classList.remove("active");
    }
    node.classList.add("active");
  });
  return node;
}

function filterCategory(value) {
  let category = productAll.filter((item) => item.product_category == value);
  renderProducts(category);
  setupPagination(category, perPage);
  displayList(category, perPage, currentPage);
}
// show category
function showCategory() {
  let category = productAll.map((item) => item.product_category);
  let uniqueCategory = [...new Set(category)];
  let categoryHtml = "";
  uniqueCategory.forEach((item) => {
    categoryHtml += `<li class="cartegory-left-item">
  <a href="javascript:;" onclick="filterCategory('${item}')">${item}</a>
</li>`;
  });
  document.querySelector(".cartegory-left-list").innerHTML = categoryHtml;
}
window.onload = showCategory();
//filterCategory
// function filterCategory(value) {
//   let category = productAll.filter((item) => item.product_category == value);
//   renderProducts(category);
//   setupPagination(category, perPage);
//   displayList(category, perPage, currentPage);
// }
// show product

function showProduct() {
  renderProducts(productAll);
  setupPagination(productAll, perPage);
  displayList(productAll, perPage, currentPage);
}
window.onload = showProduct();

// add to cart

// search product
// let search = document.querySelector(".search");
// search.addEventListener("keyup", function () {
//   let searchValue = search.value;
//   let searchProduct = productAll.filter((item) =>
//     item.product_name.toLowerCase().includes(searchValue.toLowerCase())
//   );
//   renderProducts(searchProduct);
//   setupPagination(searchProduct, perPage);
//   displayList(searchProduct, perPage, currentPage);
// });

// sort product
// let sort = document.querySelector(".sort");
// sort.addEventListener("change", function () {
//   let sortValue = sort.value;
//   if (sortValue == "price-asc") {
//     productAll.sort((a, b) => a.product_price - b.product_price);
//   } else if (sortValue == "price-desc") {
//     productAll.sort((a, b) => b.product_price - a.product_price);
//   }
//   renderProducts(productAll);
//   setupPagination(productAll, perPage);
//   displayList(productAll, perPage, currentPage);
// });
