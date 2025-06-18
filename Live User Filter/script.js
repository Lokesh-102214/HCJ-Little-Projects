const result = document.getElementById('result');
const filter = document.getElementById('filter');
const toggleMode = document.getElementById('toggleMode');

let users = [];

showSkeletons(6);
fetchUsers();

toggleMode.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  toggleMode.textContent = next === 'dark' ? '☀️' : '🌙';
});

function showSkeletons(count) {
  result.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.className = 'skeleton';
    li.innerHTML = `<div class="circle"></div><div class="line"></div>`;
    result.appendChild(li);
  }
}

async function fetchUsers() {
  try {
    const res = await fetch('https://randomuser.me/api/?results=50');
    const data = await res.json();
    users = data.results;
    displayUsers(users);
  } catch (e) {
    result.innerHTML = `<li style="padding:20px;">⚠️ Failed to load users.</li>`;
  }
}

function displayUsers(userList) {
  result.innerHTML = '';
  userList.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}" />
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `;
    result.appendChild(li);
  });
}

// Debounce to limit API or DOM calls
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

filter.addEventListener('input', debounce((e) => {
  const query = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const filtered = users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const location = `${user.location.city}, ${user.location.country}`.toLowerCase();
    return fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query) ||
           location.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query);
  });

  result.innerHTML = '';
  filtered.forEach(user => {
    const li = document.createElement('li');
    const name = highlightMatch(`${user.name.first} ${user.name.last}`, query);
    const loc = highlightMatch(`${user.location.city}, ${user.location.country}`, query);
    li.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}" />
      <div class="user-info">
        <h4>${name}</h4>
        <p>${loc}</p>
      </div>
    `;
    result.appendChild(li);
  });

  if (filtered.length === 0) {
    result.innerHTML = '<li style="padding:20px;">No matching users found.</li>';
  }
}, 300));

function highlightMatch(text, query) {
  if (!query.trim()) return text; // ✅ Skip highlighting on empty/space-only query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, `<span class="highlight">$1</span>`);
}
