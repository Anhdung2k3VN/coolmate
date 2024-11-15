function vnd(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
var productAll = JSON.parse(localStorage.getItem("products")).filter(
  (item) => item.status == 1
);

function getProductInfo(masp) {
  let products = JSON.parse(localStorage.getItem("products"));
  return products.find((item) => {
    return item.masp == masp;
  });
}

function detailProduct(masp) {
  let product = getProductInfo(masp);
  let productDetail = document.querySelector(".product-detail");
  productDetail.innerHTML = `
   <div class="container">
        <div class="row-flex row-flex-product-detail">
          <p>Sản phẩm</p>
          <i class="ri-arrow-right-line"> </i>
          <p>${product.masp}</p>
        </div>
        <div class="row-grid">
          <div class="product-detail-left">
            <img
              class="product-image-main"
              src="${product.product_image.bigImg}"
              alt=""
            />
            <div class="product-image-items">
              <img
                class="active"
                src="${product.product_image.bigImg}"
                alt=""
              />
              <img
                src="${product.product_image.smallImg1}"
                alt=""
              />
              <img
                src="${product.product_image.smallImg2}"
                alt=""
              />
              <img
                src="${product.product_image.smallImg3}"
                alt=""
              />
            </div>
          </div>
          <div class="product-detail-right">
            <div class="product-detail-right-info">
              <h1>${product.product_name}</h1>
              <span>${product.product_material}</span>
              <div class="product-price">
                <p class="price">${vnd(product.product_price)} <del>${vnd(
    product.product_del
  )}</del></p>
              </div>
            </div>
            <div class="product-detail-right-des">
              <h2>Đặc điểm nổi bật</h2>
              <ul>
                <li>${product.detail.dong1}</li>
                 <li>${product.detail.dong2}</li>
                 <li>${product.detail.dong3}</li>
                <li>${product.detail.dong4}</li>
                 <li>${product.detail.dong5}</li>
                <li>Tự hào sản xuất tại Việt Nam</li>
              </ul>
            </div>
            <div class="product-detail-right-quantity">
              <h2>Số lượng:</h2>
              <div class="product-detail-right-quantity-input">
                <i class="ri-subtract-fill"></i>
                <input
                  onkeydown="return false"
                  class="quantity-input"
                  type="number"
                  value="1"
                />
                <i class="ri-add-line"></i>
              </div>
            </div>
            <div class="product-detail-right-addcart">
              <button id="add"  class="main-btn" onclick="addToCart('${
                product.masp
              }')">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        <div class="row-flex">
          <div class="product-detail-content">
            <h2>Chi tiết sản phẩm</h2>
            <p>
              Áo thun nam là một trong những item cơ bản và linh hoạt nhất trong tủ đồ của phái mạnh. Với thiết kế đơn giản nhưng không kém phần thời trang, áo thun nam có thể kết hợp với nhiều loại quần và phụ kiện khác nhau, tạo nên những phong cách đa dạng từ năng động, trẻ trung đến lịch lãm, trưởng thành.
            </p>
     </div>
        </div>
      </div>
    `;
  productDetail.style.display = "block";
}
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
if (document.querySelector(".quantity-input") != null) {
  document.querySelector(".ri-add-line").addEventListener("click", () => {
    document.querySelector(".quantity-input").value++;
  });
  document.querySelector(".ri-subtract-fill").addEventListener("click", () => {
    if (document.querySelector(".quantity-input").value > 1) {
      document.querySelector(".quantity-input").value--;
    }
  });
}
