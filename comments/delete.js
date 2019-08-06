'use strict'

const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.delete = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    }

    dynamoDB.delete(params, (err, data) => {
      if(err) {
          console.log(err)
          return callback(err, null)
      }
      
      const response = {
          statusCode: 200,
          body: JSON.stringify({})
      }

      callback(null, response)
      
    })
}