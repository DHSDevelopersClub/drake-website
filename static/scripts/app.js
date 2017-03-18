// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js').then(reg => {
//     console.log('[SW] Registered');
//   }).catch(function(error) {
//     console.log(`[SW] Registration failed: ${error}`);
//   });
// };

// VARS
const classList = document.getElementById('class-list');
const search = document.getElementById('search');
const tables = document.querySelectorAll('table');
const content = document.getElementById('content');

const pinned = tables[0];
const unpinned = tables[1];

var request = indexedDB.open('teacherCache', 1);

request.onerror = err => {
  console.error(err);
}

request.onsuccess = evt => {
  console.log('Created database');
  db = evt.target.result;
}

request.onupgradeneeded = function (event) {

  var db = event.target.result;

  if (!db.objectStoreNames.contains('teachers')) {
    var os = db.createObjectStore('teachers', {keyPath: 'id', autoIncrement: true});
  }
};

// Initial Filling
fetch('teacher-pages.json')
.then(resp => {
  data = resp.json()
  .then(data => {
    fillUnpinned(data);
  })
});

function fillUnpinned(data) {
  for (let i = 0; i < data.length; i++) {
    let classRow = document.createElement('tr');
    let first = `<span><img src="/res/star-empty.svg" alt="Star" class="star"></span>`;
    classRow.className = 'class';
    classRow.id = i;
    classRow.innerHTML = `${first}<td class="class-name">${data[i].class}</td><td class="teacher-name">${data[i].name}</td>`;
    classList.appendChild(classRow);
  }
  addEventListeners();
}

// Pinning Functionality
function removeFromList(list, element) {
  element.remove();
}

function addToList(list, element) {
  if (list === unpinned) {
    list = pinned;
  } else {
    list = unpinned;
  }
  list.appendChild(element);
}

function addEventListeners() {
  let stars = document.getElementsByClassName('star');

  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', evt => {
      let clickedRow = evt.path[2];
      let list = evt.path[3];
      removeFromList(list, clickedRow);
      addToList(list, clickedRow);
      if (list.id === 'pinned') {
        evt.path[0].src = '/res/star-empty.svg';
      } else {
        evt.path[0].src = '/res/star-gold.svg';
      }
    });
  }
}

// Search Functionality
function writeToList(i, row) {
  let items = row.querySelectorAll('td');
  let className = items[0];
  let teacherName = items[1];

  let classRow = document.createElement('tr');
  let first = `<span><img src="/res/star-empty.svg" alt="Star" class="star" id="${i}"></span>`;
  classRow.className = 'class';
  classRow.innerHTML = `${first}<td class="class-name">${className}</td><td class="teacher-name">${teacherName}</td>`;
  unpinned.appendChild(classRow);
}

function updateList(word) {
  let rows = unpinned.querySelectorAll('tr');
  for (let i = 0; i < rows.length; i++) {
    let items = rows[i].querySelectorAll('td');
    word = word.toLowerCase();
    let className = items[0].textContent.toLowerCase();
    let teacherName = items[1].textContent.toLowerCase();
    if (className.includes(word) || teacherName.includes(word)) {
      // writeToList(i, rows[i]);
      rows[i].style.display = 'block';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

search.addEventListener('keyup', evt => {
  let keycode = evt.keyCode;
  let valid =
        (keycode > 47 && keycode < 58)   || // number keys
        (keycode == 32)                  || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);

  if (valid || keycode === 8) {
    wordSearch = search.value;
    updateList(wordSearch);
  }
});


// ROUTER 
const links = document.querySelectorAll('a');
const gradient = document.querySelector('#gradient');

gradient.style.transition = 'all ease-in-out .3s';

const home = links[0];

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', evt => {
    evt.preventDefault();
    // gradient.style.transform = 'skew(4deg)';
    gradient.style.top = '-200px';
    let uri = evt.target.href;
    fetch(uri)
    .then(resp => {
      resp.text()
      .then(data => {
        content.innerHTML = data;
      })    
    })
  });
}

links[0].removeEventListener('click', evt =>{});

home.addEventListener('click', evt => {
    // gradient.style.transform = 'skew(8deg)';
    gradient.style.top = '0';
});

// GRADES

const gradesLink = document.getElementById('grades-button');

gradesLink.addEventListener('click', evt => {
  window.open('https://home.tamdistrict.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f', '_blank');
});


