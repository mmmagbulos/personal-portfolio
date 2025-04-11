let isDown = false;
let startX;
let scrollLeft;

function handleMouseDown(e, element) {
  isDown = true;
  element.classList.add('active');
  startX = e.pageX - element.offsetLeft;
  scrollLeft = element.scrollLeft;
}

function handleMouseLeave(element) {
  isDown = false;
  element.classList.remove('active');
}

function handleMouseUp(element) {
  isDown = false;
  element.classList.remove('active');
}

function handleMouseMove(e, element) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - element.offsetLeft;
  const walk = (x - startX) * 1.5;
  element.scrollLeft = scrollLeft - walk;
}

function addDragScrollEvents(element) {
  element.addEventListener('mousedown', (e) => handleMouseDown(e, element));
  element.addEventListener('mouseleave', () => handleMouseLeave(element));
  element.addEventListener('mouseup', () => handleMouseUp(element));
  element.addEventListener('mousemove', (e) => handleMouseMove(e, element));
  // Touch support
  element.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });
  element.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - element.offsetLeft;
    const walk = (x - startX) * 1.5;
    element.scrollLeft = scrollLeft - walk;
  });
}

const dragScroll = document.querySelector('.drag-scroll');
const menuSlider = document.querySelector('.menu-slider');

addDragScrollEvents(dragScroll);
addDragScrollEvents(menuSlider);

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#portfolio-slider', {
    type: 'slide',
    perPage: 1,
    perMove: 1,
    pagination: false,
    arrows: false,
    gap: '2rem',
    breakpoints: {
      768: {
        perPage: 1,
      }
    }
  }).mount();
});

    var elms = document.getElementsByClassName('splide');
    for (var i = 0, len = elms.length; i < len; i++) {
      new Splide(elms[i], {
        perPage: 1,
        perMove: 1,
        type: 'loop',
        focus: 'center',
        gap: '1rem',
        breakpoints: {
          767: {
            perPage: 1,
          }
        }
      }).mount();
    }

    const navLinks = document.querySelectorAll('.nav a');
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
          a.classList.add("active");
        }
      });
    });
