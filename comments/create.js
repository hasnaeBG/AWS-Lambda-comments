'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.commentContent !== 'string') {
      console.error('An error is encountered');
      callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain'},
          body: 'Couldn\'t create the comment'
      });
      return;  
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          createdAt: timestamp,          
          commentContent : data.commentContent,
          authorName : data.authorName
        }
    }

    dynamoDb.put(params, (error) => {
        if(error) {
            console.log(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                 headers: { 'Content-Type': 'text/plain' },
                 body: 'Couldn\'t create the comment.',
            });
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    
        callback(null, response)    
    })

}