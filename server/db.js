const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getItems = async (table_name, last_key = null) => {
  const params = {
    TableName: table_name,
    ExclusiveStartKey: last_key,
  };
  return await dynamoClient.scan(params).promise();
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
  getItems,
  addOrUpdateItem,
  getItemById,
  deleteItem,
}