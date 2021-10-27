const router = require('express').Router();
const {buildParams, getItems} = require('../db');

router.get('/getSearchItems/:type' , async (req, res) => {
  const {type} = req.params;
  console.log('hit')
  let itemPromises = await getItems(buildParams('items', null, ['id', 'icon', 'itemType', 'tier', 'rarity'], ['name'], `itemType = :${type}`));
  const items = await Promise.all(itemPromises)
  res.json(items)
})

module.exports = router;