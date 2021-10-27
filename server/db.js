const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const scanClient = async (params) => await dynamoClient.scan(params).promise();

const buildParams = (table_name, last_key, specified_columns, reserved_columns, condition) => {
  const params = {
    TableName: table_name,
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };

  const obj = {};
  const projectionArray = []
  if(last_key) {
    params.ExclusiveStartKey = last_key;
  }
  if(reserved_columns) {
    for(const key of reserved_columns) {
      obj[`#${key}`] = key;
      projectionArray.push(`#${key}`);
    }
  }
  if(specified_columns) {
    projectionArray.push(...specified_columns);
  }
  if(condition) {
    console.log(condition.split(':'))
    params.ExpressionAttributeValues[`:${condition.split(':')[1]}`] = `${condition.split(':')[1]}`
    params.KeyConditionExpression = condition;
    params.FilterExpression = condition;

  }
  if(Object.keys(obj).length !== 0) {
    params.ExpressionAttributeNames = obj;
  }
  if(projectionArray.length !== 0) {
    params.ProjectionExpression = projectionArray.join(', ');
  }
  console.log(params)
  return params;
}

const getItems = async (params) => {
  let localParams = params;
  const totalItems = []
  let items
  do{
    items = await scanClient(localParams)
    totalItems.push(...items.Items)
    localParams.ExclusiveStartKey = items.LastEvaluatedKey;
  }while(items.LastEvaluatedKey !== undefined)
  return totalItems;
}

const addOrUpdateItem = async (table_name, item) => {
  const params = {
    TableName: table_name,
    Item: item,
  }
  return await dynamoClient.put(params).promise();
}

const getItemById = async (table_name, item) => {
  const params = {
    TableName: table_name,
    Key: {id}
  }
  return await dynamoClient.put(params).promise();
}

const deleteItem = async (table_name, id) => {
  const params = {
    TableName: table_name,
    Key: {id}
  }
  return await dynamoClient.delete(params).promise();
}

module.exports = {
  dynamoClient,
  buildParams,
  getItems,
  addOrUpdateItem,
  getItemById,
  deleteItem,
}