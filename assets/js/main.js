/**
* Template Name: Reveal - v4.1.0
* Template URL: https://bootstrapmade.com/reveal-bootstrap-corporate-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.hero-slider', {
    speed: 1000,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
   window.addEventListener('mousemove', () => {
    {
      let categoryContainer = select('.list-category-container');
      if (categoryContainer) {
        let categoryIsotope = new Isotope(categoryContainer, {
          itemSelector: '.category-item',
          layoutMode: 'fitRows'
        });

        let selectFilters = select('#select-category li', true);
        on('click', '#select-category li', function (e) {
          e.preventDefault();
          selectFilters.forEach(function (el) {
            el.classList.remove('category-active');
          });
          this.classList.add('category-active');

          categoryIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          categoryIsotope.on('arrangeComplete', function () {
            AOS.refresh()
          });
        }, true);
      }
    }
  })
   window.addEventListener('load', () => {
    let infoBeasiswaContainer = select('.info-beasiswa-container')

    if (infoBeasiswaContainer) {
      let infoBeasiswaIsotope = new Isotope(infoBeasiswaContainer, {
        itemSelector: '.info-beasiswa-item',
        layoutMode: 'fitRows'
      });
      let selectFiltersBeasiswa = select('#select-filters-beasiswa li', true);

      on('click', '#select-filters-beasiswa li', function (e) {
        e.preventDefault();
        selectFiltersBeasiswa.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        infoBeasiswaIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        infoBeasiswaIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }


  });
  window.addEventListener('load', () => {
    let lombaContainer = select('.lomba-container')

    if (lombaContainer) {
      let lombaIsotope = new Isotope(lombaContainer, {
        itemSelector: '.list-lomba-item',
        layoutMode: 'fitRows'
      });
      let selectFiltersLomba = select('#select-filters-lomba li', true);

      on('click', '#select-filters-lomba li', function (e) {
        e.preventDefault();
        selectFiltersLomba.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        lombaIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        lombaIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }


  });
  window.addEventListener('load', () => {
    let trendingContainer = select('.trending-container');
    if (trendingContainer) {
      let trendingIsotope = new Isotope(trendingContainer, {
        itemSelector: '.trending-item',
        layoutMode: 'fitRows'
      });

      let trendingFilters = select('#trending-flters li', true);

      on('click', '#trending-flters li', function(e) {
        e.preventDefault();
        trendingFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        trendingIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        trendingIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate trending lightbox 
   */
  const itemLightbox = GLightbox({
    selector: '.item-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()