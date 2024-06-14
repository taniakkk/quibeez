document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   const animItems = document.querySelectorAll('._anim-items');

   if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
               animItem.classList.add('_active');
            } else {
               if (!animItem.classList.contains('_anim-no-hide')) {
                  animItem.classList.remove('_active');
               }
            }
         }
      }
      function offset(el) {
         const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
         return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
         }
      }
      setTimeout(() => {
         animOnScroll();
      }, 300);
   }

   if (document.querySelector('.image-slider')) {
      new Swiper('.image-slider', {
         speed: 3000,
         simulateTouch: false,
         allowTouchMove: false,
         effect: 'fade',
         fadeEffect: {
            crossFade: true
         },
         autoplay: {
            delay: 2000,
            disableOnInteraction: false
         },
         pagination: {
            el: '.bullets__items',
            type: 'bullets',
            clickable: true
         },
      });
   }
   const iconMenu = document.querySelector('.menu__icon');
   const menuBody = document.querySelector('.menu__body');
   if (iconMenu) {
      iconMenu.addEventListener('click', function () {
         document.body.classList.toggle('_lock');
         iconMenu.classList.toggle('_active');
         menuBody.classList.toggle('_active');
      });
   }

   const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
   if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
         menuLink.addEventListener('click', onMenuLinkClick);
      });

      function onMenuLinkClick(el) {
         const menuLink = el.target;
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) { //for section translation
               document.body.classList.remove('_lock');
               iconMenu.classList.remove('_active');
               menuBody.classList.remove('_active');
            }

            window.scrollTo({//scroll function
               top: gotoBlockValue,
               behavior: 'smooth'
            });

            el.preventDefault();//turn off reference work
         }
      }
   }
   headerScroll();
});

function headerScroll() {
   addWindowScrollEvent = true;
   const header = document.querySelector('header.header');
   const headerShow = header.hasAttribute('data-scroll-show');
   const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
   const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
   let scrollDirection = 0;
   let timer;
   document.addEventListener("scroll", function (e) {
      const scrollTop = window.scrollY;
      clearTimeout(timer);
      if (scrollTop >= startPoint) {
         !header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
         if (headerShow) {
            if (scrollTop > scrollDirection) {
               // downscroll code
               header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
            } else {
               // upscroll code
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            }
            timer = setTimeout(() => {
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            }, headerShowTimer);
         }
      } else {
         header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
         if (headerShow) {
            header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
         }
      }
      scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
   });
}