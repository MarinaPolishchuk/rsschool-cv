"use strict"

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
};

if (isMobile.any()) {
  document.body.classList.add('_touch');
} else {
  document.body.classList.add('_pc');
}
//Бургер
const iconMenu = document.querySelector('.burger-menu');
const menuBody = document.querySelector('.header__navigation');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.navigation__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });


  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
//accordion
var acc = [...document.getElementsByClassName("price__type")];
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    if (this.classList.contains('active')) {
      this.classList.remove("active");
      this.querySelector('.accordion_block').style.height = 0;
    } else {
      acc.forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion_block').style.height = 0;
      });
      this.classList.add("active");
      let accordion = this.querySelector('.accordion_block');
      accordion.style.height = accordion.scrollHeight + 13 + "px";
    }
  });
}


// contact form
const formEl = document.querySelector('.contact__form');
const formButtonEl = document.querySelector('.contact__button');
const cities = [...document.getElementsByClassName('city__block')];

let formClick = (e) => {
  let target = e.target;
  if (target.classList.contains('city__select')) {
    formButtonEl.textContent = target.textContent;
    cities.forEach(c => c.classList.remove('active'));
    let city = formEl.querySelector('.city__block-' + target.dataset.cityIndex);
    city.classList.add('active');
  }
};

formEl.addEventListener('click', formClick);
