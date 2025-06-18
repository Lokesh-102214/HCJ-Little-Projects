const card = document.getElementById('card');
const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile-img');
const name = document.getElementById('name');
const date = document.getElementById('date');

function getData() {
  // Simulate fetch from backend or CMS
  try {
    header.innerHTML = `<img src="andras-vas-Bd7gNnWJBkU-unsplash.jpg" alt="Work Desk" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />`;
    title.textContent = 'Lorem ipsum dolor sit amet';
    excerpt.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis.';
    profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="John Doe" loading="lazy" style="width: 100%; height: 100%; border-radius: 50%;" />`;
    name.textContent = 'John Doe';
    date.textContent = 'Oct 06, 2020';

    // Remove shimmer classes
    [header, title, excerpt, profile_img, name, date].forEach(el => {
      el.classList.remove('animated-bg');
      el.classList.remove('animated-text');
    });

    card.setAttribute('aria-busy', 'false');
  } catch (error) {
    console.error('Failed to load content', error);
    excerpt.textContent = 'Something went wrong while loading data.';
  }
}

// Simulate delay (e.g. network latency)
setTimeout(getData, 2500);
