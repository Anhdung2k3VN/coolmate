const menuList = document.querySelectorAll(".admin-sidebar-menu > ul > li > a");
const subMenu = document.querySelectorAll(".sub-menu");
for (let i = 0; i < menuList.length; i++) {
  menuList[i].addEventListener("click", function () {
    // menuList[i].parentNode.querySelector("ul").classList.toggle("active");
    for (let j = 0; j < subMenu.length; j++) {
      subMenu[j].setAttribute("style", "height: 0px");
    }
    const submenuHeight =
      menuList[i].parentNode.querySelector("ul .sub-menu-items").offsetHeight;
    menuList[i].parentNode.querySelector("ul").style.height =
      submenuHeight + "px";
  });
}
