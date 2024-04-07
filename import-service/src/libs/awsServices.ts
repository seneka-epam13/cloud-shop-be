import  AWS  from "aws-sdk";

export const s3 = new AWS.S3({ region: 'us-east-1', signatureVersion: 'v4'});


export const sqs = new AWS.SQS({ region: 'us-east-1' });