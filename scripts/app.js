// Removed for dev

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js').then(reg => {
//     console.log('[SW] Registered');
//   }).catch(function(error) {
//     console.log(`[SW] Registration failed: ${error}`);
//   });
// };

// fetch('../views/home.html', { method: 'GET' })
// .then(resp => {
//   resp.blob().then(data => {
//     console.log(data);
//   });
// })
// .catch(err => {
//   console.warn('Fetch error: ', err);
// });

const teacherCache = localStorage;

const classList = document.getElementById('class-list');
const search = document.getElementById('search');

let wordSearch = '';

console.log(search);

function updateList(word) {
  fetch('teacher-pages.json', _ => {

  })
  .then(function(resp){
    let data = resp.json(() => {
    }).then(data => {
      if (word) {
        classList.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
          word = word.toLowerCase();
          let className = data[i].class.toLowerCase();
          let teacherName = data[i].name.toLowerCase();
          if (className.includes(word) || teacherName.includes(word)) {
            let classDiv = document.createElement('div');
            teacherCache.setItem(i, 'star-empty.svg');
            let first = `<img src="/res/${teacherCache.getItem(i)}" alt="Star" class="star">`;
            classDiv.className = 'class';
            classDiv.setAttribute('id', i);
            classDiv.innerHTML = `${first}<div class="class-name">${data[i].class}</div><div class="teacher-name">${data[i].name}</div>`;
            classList.appendChild(classDiv);
          }
        }
      } else {
        classList.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
          let classDiv = document.createElement('div');
          teacherCache.setItem(i, 'star-empty.svg');
          let first = `<img src="/res/${teacherCache.getItem(i)}" alt="Star" class="star">`;
          classDiv.className = 'class';
          classDiv.setAttribute('id', i);
          classDiv.innerHTML = `${first}<div class="class-name">${data[i].class}</div><div class="teacher-name">${data[i].name}</div>`;
          classList.appendChild(classDiv);
        }
      }
    })
  })
}

search.addEventListener('keyup', evt => {
  let keycode = evt.keyCode;
  let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);

  if (valid || keycode === 8) {
    if(keycode === 8) {
      wordSearch = wordSearch.substring(0, wordSearch.length - 1);
    } else {
      wordSearch += evt.key;
    }
    console.log(wordSearch);
    updateList(wordSearch);
  }
});

updateList();