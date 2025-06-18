const textarea = document.getElementById('textarea');
const tagsEl = document.getElementById('tags');
const pickButton = document.getElementById('pickButton');
const clearButton = document.getElementById('clearButton');

// Enable button when there's input
textarea.addEventListener('input', () => {
  pickButton.disabled = textarea.value.trim() === '';
  createTags(textarea.value);
});

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && textarea.value.trim() !== '') {
    e.preventDefault(); // Prevent newline
    pickRandomChoice();
  }
});

pickButton.addEventListener('click', () => {
  if (textarea.value.trim() !== '') {
    pickRandomChoice();
  }
});

clearButton.addEventListener('click', () => {
  textarea.value = '';
  tagsEl.innerHTML = '';
  pickButton.disabled = true;
});

function createTags(input) {
  const tags = input
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  tagsEl.innerHTML = '';
  tags.forEach(tag => {
    const el = document.createElement('span');
    el.classList.add('tag');
    el.textContent = tag;
    tagsEl.appendChild(el);
  });
}

function pickRandomChoice() {
  const times = 20;
  const interval = setInterval(() => {
    const tag = pickRandomTag();
    if (tag) {
      highlightTag(tag);
      setTimeout(() => unHighlightTag(tag), 100);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const tag = pickRandomTag();
      highlightTag(tag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  if (tags.length === 0) return null;
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
