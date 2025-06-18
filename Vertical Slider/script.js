const textSlides = document.querySelectorAll('.slider-text .slide');
const imageSlides = document.querySelectorAll('.slider-image .slide');
const upBtn = document.querySelector('.arrow.up');
const downBtn = document.querySelector('.arrow.down');
let current = 0;

function showSlide(idx) {
  textSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  imageSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}

upBtn.addEventListener('click', () => {
  current = (current - 1 + textSlides.length) % textSlides.length;
  showSlide(current);
});

downBtn.addEventListener('click', () => {
  current = (current + 1) % textSlides.length;
  showSlide(current);
});