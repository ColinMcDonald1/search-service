import algoliasearch from 'algoliasearch';
import { ALGOLIA_API_KEY } from './apiKeys';

const client = algoliasearch('9BLG8EZ2BJ', ALGOLIA_API_KEY);
const index = client.initIndex('dev_care_cards');

export const filterAlgoliaCards = (searchValue) => {
  return new Promise((resolve, reject) => {
    index.search({
      query: searchValue,
    }, (err, content) => {
      if (err) {
        reject(err)
      } else {
        console.log('sup content', content)
        resolve(content.hits);
      }
    })
  })
};

