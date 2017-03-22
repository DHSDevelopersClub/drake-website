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
var teacherJSON;

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
    teacherJSON = data;
    fillUnpinned();
  })
});

function fillUnpinned() {
  for (let i = 0; i < teacherJSON.length; i++) {
    let classRow = document.createElement('tr');
    let first = `<span><img src="/res/star-empty.svg" alt="Star" class="star"></span>`;
    classRow.className = 'class';
    classRow.id = i;
    classRow.innerHTML = `${first}<td class="class-name">${teacherJSON[i].class}</td><td class="teacher-name">${teacherJSON[i].name}</td>`;
    classRow.onclick = teacherListHandeler;
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

function updateList(word) {
  let rows = unpinned.querySelectorAll('tr');
  for (let i = 0; i < rows.length; i++) {
    let items = rows[i].querySelectorAll('td');
    word = word.toLowerCase();
    let className = items[0].textContent.toLowerCase();
    let teacherName = items[1].textContent.toLowerCase();
    if (className.includes(word) || teacherName.includes(word)) {
      rows[i].style.display = 'table-row';
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
const gradient = document.querySelector('#gradient');
const items = document.querySelectorAll('.item');

for (let item of items) {
  item.addEventListener('click', evt => {
    let url = evt.path[0].id;
    if (url === '/views/home.html') {
      expandHeader();
    } else {
      shrinkHeader();
    }
    navInternal(url);
  });
}

function teacherListHandeler (e) {
  shrinkHeader();
  classID = e.path[1].id
  classData = teacherJSON[parseInt(classID)]
  url = classData.url;
  // Change later
  navInternal('/views/contact.html');
}

function navInternal (url) {
  window.history.pushState(null, null, url);

  fetch(url)
  .then(resp => {
    data = resp.text()
    .then(data => {
      swapContent(data);
    })
  });
}

function swapContent(htmlData) {
  content.innerHTML = htmlData;
}

function shrinkHeader() {
  gradient.style.transition = 'all ease-in-out .5s';
  gradient.style.top = '-200px';
  gradient.style.transform = 'skewY(4deg)';
  gradient.style.background = 'linear-gradient(-8deg, #00E676 0%, #1DE9B6 32%)';
}

function expandHeader() {
  gradient.style.transition = 'all ease-in-out .5s';
  gradient.style.top = '0';
  gradient.style.transform = 'skewY(8deg)';
  gradient.style.background = 'linear-gradient(-8deg, #00E676 0%, #1DE9B6 65%)';
}

// GRADES

const gradesLink = document.getElementById('grades-button');

gradesLink.addEventListener('click', evt => {
  window.open('https://home.tamdistrict.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f', '_blank');
});
