const axios = require('axios');
const {seedDetailData, seedData} = require('./seed');
const {getItems} = require('./db');

const PAGE_URL = (type, count) => `https://nwdb.info/db/items/${type}/page/${count}.json`;
const TYPE_DICTIONARY = [
  'weapons',
  'armors',
  'tools',
]

//gets all items data of specified page from nwdb.info page by page
const dataRequest = async () => {
  const dataPull = [];
  let pageCount = 1;
  let count = 1;
  while(count <= pageCount) {
    const response = await axios.get(PAGE_URL(TYPE_DICTIONARY[2], count));
    if(count === 1) {
      pageCount = response.data.pageCount;
    }
    dataPull.push(...response.data.data);
    count++;
  }
  seedData(dataPull);
};

// gets item details of items in 'items' table and stores them in 'item_detail' table
const getItemDetails = async () => {
  const totalItems = []
  let items
  do{
    items = await getItems('items', items?.LastEvaluatedKey);
    totalItems.push(...items.Items)
  }while(items.LastEvaluatedKey !== undefined)
  const itemIDs = totalItems.map(item => item.id);
  seedDetailData(itemIDs)
};