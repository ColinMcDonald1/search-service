import Fuse from 'fuse.js';
import { cards } from './cards';
import { removeStopWords } from './utils';

const fuse = new Fuse(
  cards.filter(card => {
    if (card.cardType !== 'asset') {
      return true;
    } else {
      return false;
    }
  }),
  {
    shouldSort: true,
    tokenize: true,
    keys: [
      {
        name: 'search.title',
        weight: 0.7,
      },
      {
        name: 'search.content',
        weight: 0.3,
      },
      {
        name: 'search.extendedContent',
        weight: 0.1,
      },
    ],
  }
);
const table = document.createElement('table');
const header = document.createElement('tr');
const rank = document.createElement('td');
const title = document.createElement('td');

rank.innerText = 'Rank';
title.innerText = 'Title';
table.id = 'filteredCards';

header.appendChild(rank);
header.appendChild(title);

const search = document.createElement('input');
let searchValue = '';

search.addEventListener('input', (e) => {
  searchValue = e.currentTarget.value;
});

document.body.appendChild(search);
document.body.appendChild(table);

const sortCards = (cards) => {
  const table = document.createElement('table');

  table.appendChild(header);

  cards.forEach((card, i) => {
    const row = document.createElement('tr');
    const rank = document.createElement('td');
    const title = document.createElement('td');

    title.innerText = card.content && card.content.title;
    rank.innerText = i;

    row.appendChild(rank);
    row.appendChild(title);
    table.appendChild(row);
  });

  const oldTable = document.getElementsByTagName('table')[0];

  oldTable.replaceWith(table);
};

const punctuationRegExp = new RegExp(/[.,\?\/#!$%\^&\*;:{}=\-_`~()]/g);

search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    if (searchValue.length) {
      const filteredCards = fuse.search(
        removeStopWords(searchValue.replace(punctuationRegExp, ''))
      );
      searchValue = '';
      sortCards(filteredCards);
    } else {
      sortCards(cards);
    }
  }
});

sortCards(cards);

