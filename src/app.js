//fetch student data from data.json file
function loadCards() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

//create student cards from the data
function createElement(item) {
  const div = document.createElement('div');
  div.setAttribute('class', 'card');
  div.setAttribute('data-class', item.class);
  div.setAttribute('data-enrolled', item.enrolled);

  const img = document.createElement('img');
  img.setAttribute('class', 'card__img');
  img.setAttribute('src', item.image);

  const dl = document.createElement('dl');
  dl.innerHTML = `
  <div class="card__description__group">
    <dt>Name</dt>
    <dd>${item.name}</dd>
  </div>
  <div class="card__description__group">
    <dt>Gender</dt>
    <dd>${item.gender}</dd>
  </div>
  <div class="card__description__group">
    <dt>Class</dt>
    <dd>${item.class}</dd>
  </div>
  <div class="card__description__group">
    <dt>Enrolled</dt>
    <dd>${item.enrolled}</dd>
  </div>`;
  dl.setAttribute('class', 'card__description');

  div.append(img);
  div.append(dl);
  return div;
}

//filter the student cards by category
function onRadioClick(event, items) {
  const key = event.target.name;
  const value = event.target.value;
  if (key == null || value == null) {
    return;
  }
  checkOhterFilter(items, key, value);
}

function checkOhterFilter(items, key, value) {
  const enroll = document.querySelector('input[name=enrolled]:checked');
  const classGroup = document.querySelector('input[name=class]:checked');

  if (enroll == null || classGroup == null) {
    items.forEach((item) => {
      if (item.dataset[key] === value) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }
    });
    return;
  }

  let secondKey = '';
  let secondValue = '';
  if (key == 'class') {
    secondKey = 'enrolled';
    secondValue = `${enroll.value}`;
  } else {
    secondKey = 'class';
    secondValue = `${classGroup.value}`;
  }

  updateCards(items, key, value, secondKey, secondValue);
}

//show filtered cards only
function updateCards(items, key, value, secondKey, secondValue) {
  items.forEach((item) => {
    if (
      item.dataset[key] === value &&
      item.dataset[secondKey] === secondValue
    ) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function resetFilter(items) {
  items.forEach((item) => {
    item.classList.remove('invisible');
  });
}

//append created student cards to the container
//and set eventlistener
loadCards().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector('.cards');
  container.append(...elements);

  const classFilter = document.querySelector('.filter-group__class');
  const enrollFilter = document.querySelector('.filter-group__enroll');
  const resetBtn = document.querySelector('.reset-btn');

  classFilter.addEventListener('click', (event) => {
    onRadioClick(event, elements);
  });

  enrollFilter.addEventListener('click', (event) => {
    onRadioClick(event, elements);
  });

  resetBtn.addEventListener('click', () => {
    resetFilter(elements);
  });
});

//open and close filter section
const filterOpenBtn = document.querySelector('.tab-menu__btn');
const filterCloseBtn = document.querySelector('.filter__btn');
const filter = document.querySelector('.filter');

filterOpenBtn.addEventListener('click', () => {
  filter.classList.remove('invisible');
});

filterCloseBtn.addEventListener('click', () => {
  filter.classList.add('invisible');
});
