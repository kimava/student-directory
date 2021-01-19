function loadCards() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

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

loadCards().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector('.cards');
  container.append(...elements);
});
