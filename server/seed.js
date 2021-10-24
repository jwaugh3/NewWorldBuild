const axios = require('axios');
const {addOrUpdateItem} = require('./db');

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
  console.log(items.length)
  const slicedArray = items.slice(7399, 7511)
  console.log(slicedArray.length)
  try {
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

module.exports = {
  seedData,
  seedDetailData,
}