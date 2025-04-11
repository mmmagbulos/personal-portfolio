// Declare variables globally to use for both dragScroll and menuSlider
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
