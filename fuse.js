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

const punctuationRegExp = new RegExp(/[.,\?\/#!$%\^&\*;:{}=\-_`~()]/g);

export const filterFuseCards = (searchValue) => {
  return new Promise((resolve, reject) => {
    resolve(fuse.search(removeStopWords(searchValue.replace(punctuationRegExp, ''))))
  });
};
