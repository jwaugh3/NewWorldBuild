import fetch from 'node-fetch';

const PAGE_URL = (type, count) => `https://nwdb.info/db/items/${type}/page/${count}.json`;
const TYPE_DICTIONARY = [
  'cosmetics',
  'weapons',
  'armors',
  'tools',
]

const dataCollect = async () => {
  const dataPull = [];
  let pageCount = 1;
  let count = 1;
  while(count <= pageCount) {
    const response = await fetch(PAGE_URL('armors', count));
    const json = await response.json(); 
    if(count === 1) {
      // pageCount = json.pageCount;
    }
    dataPull.push(...json.data);
    count++;
    console.log(count)
  }
  console.log(dataPull)
};

dataCollect();