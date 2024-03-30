const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


export const scanTable = async (tableName) => {
  try {
    const data = await docClient.scan({TableName: tableName}).promise();
    return data.Items;
  } catch (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  }
}

export const queryTable = async (id, tableName) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
  };

  try {
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
  }
}

export const getItem = async (id, tableName) => {
  const params = {
    TableName: tableName,
    Key: {
      'id': id,
    }
  };

  try {
    const data = await docClient.get(params).promise();
    return data.Item;
  } catch (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  }
}


export const putItem = async (item, tableName) => {
  const params = {
    TableName: tableName,
    Item: item
  };

  try {
    await docClient.put(params).promise();
    console.log("PutItem succeeded:", item);
  } catch (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  }
}

