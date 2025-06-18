function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const bg = document.querySelector('.bg');
const loadingText = document.querySelector('.loading-text');

let load = 0;

const int = setInterval(blurring, 30);

function blurring() {
  load++;

  if (load > 100) {
    clearInterval(int);
  }

  loadingText.textContent = `${load}%`;
  loadingText.style.opacity = map(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${map(load, 0, 100, 30, 0)}px)`;
  loadingText.style.fontSize = `${map(load, 0, 100, 1, 3)}rem`; // Increase font size from 3rem to 6rem
}