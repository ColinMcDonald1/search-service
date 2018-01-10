import { filterFuseCards } from './fuse';
import { filterAlgoliaCards } from './algolia';
import { cards } from './cards';
import './styles.css';

let searchValue = '';

const setupInputField = () => {
  const search = document.createElement('input');

  search.addEventListener('input', (e) => {
    searchValue = e.currentTarget.value;
  });

  search.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (searchValue.length) {
        filterFuseCards(searchValue)
          .then(fuseCards => {
            filterAlgoliaCards(searchValue)
              .then(algoliaCards => {
                searchValue = '';

                updateTables(fuseCards, algoliaCards);
              })
          })
      } else {
        updateTables(cards, cards);
      }
    }
  });

  document.body.appendChild(search);
};

const setupTables = () => {
  const container = document.createElement('div');
  const fuseTable = document.createElement('table');
  const algoliaTable = document.createElement('table');

  const header = createHeader();

  fuseTable.appendChild(header);
  algoliaTable.appendChild(header);

  fuseTable.id = 'fuseTable';
  algoliaTable.id = 'algoliaTable';
  container.id = 'container';

  container.appendChild(fuseTable);
  container.appendChild(algoliaTable);

  document.body.appendChild(container);
};

const createHeader = () => {
  const header = document.createElement('tr');
  const rank = document.createElement('td');
  const title = document.createElement('td');

  rank.innerText = 'Rank';
  title.innerText = 'Title';

  return header;
};

const updateTables = (fuseCards, algoliaCards) => {
  const header = createHeader();

  [{cards: fuseCards, id: 'fuseTable'}, {cards: algoliaCards, id: 'algoliaTable'}]
    .forEach(search => {
      updateTable(search.id, search.cards, header);
    })
};

const updateTable = (tableId, cards, header) => {
  const oldTable = document.getElementById(tableId);
  const table = document.createElement('table');
  table.id = tableId;

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

  oldTable.replaceWith(table);
};

setupInputField();
setupTables();
updateTables(cards, cards)
