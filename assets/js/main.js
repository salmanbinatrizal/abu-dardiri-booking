/**
* Project: Sistem Peminjaman Aula Abu Dardiri
* Description: Frontend interactions (nav, preloader, calendar, etc.)
* Author: [Salman Alfarisi/2203040144]
* Year: 2025
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  const MIN_PRELOAD = 250; // minimal 250 ms
  const startTime = Date.now();

  if (preloader) {
    window.addEventListener('load', () => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, MIN_PRELOAD - elapsed);

      setTimeout(() => {
        preloader.remove();
      }, remaining);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

const MonthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const UpdateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
  MonthYearElement.textContent = monthYearString;

  let datesHTML = '';

  for(let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear,currentMonth, 0 - i +1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  for (let i = 1; i <= 6 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  UpdateCalendar();
})

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  UpdateCalendar();
})

UpdateCalendar();