'use strict'

const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const params = {
    TableName: process.env.DYNAMODB_TABLE
}

module.exports.list = (event, context, callback) => {
   
    dynamoDB.scan(params, (err, data) => {
        if(err) {
            console.log(err)
            callback(err, null)
            return
        }
        
        const response = {
            statusCode : 200,
            body: JSON.stringify(data)
        }

        callback(null, response)
    })
}