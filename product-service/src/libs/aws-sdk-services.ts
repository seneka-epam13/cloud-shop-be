import AWS from 'aws-sdk'

export const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

export const sqs = new AWS.SQS({region: 'us-east-1'})

export const sns = new AWS.SNS({region: 'us-east-1'})