const axios = require('axios');
const {buildParams, getItems} = require('./db');

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
  const itemIDs = await getItems(buildParams('items', null, ['id'], null));
  // seedDetailData(itemIDs)
};

const seedData = async (items) => {
  try {
    const itemPromises = items.map(item => addOrUpdateItem('items', item))
    await Promise.all(itemPromises);
  } catch (err) {
    console.error(err);
    console.log('shit broke');
  }
};

const seedDetailData = async (items) => {
  try {
    const slicedArray = items.slice(0, 200);
    //array length shouldn't exceed 200 items
    const itemPromises = slicedArray.map((item) => {
      const promise = axios.get(`https://nwdb.info/db/item/${item.toLowerCase()}.json`);
      return promise;
    })
    const returnedData = await Promise.all(itemPromises);
    const data = returnedData.map((el) => el.data.data)
    //add/update to db
    const itemDetailPromises = data.map((item_detail) => addOrUpdateItem('item_detail', item_detail))
    await Promise.all(itemDetailPromises)
  } catch (err) {
    console.error(err);
    console.log('shit broke');
  }
};