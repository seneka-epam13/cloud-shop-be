import { S3 } from "aws-sdk";

export const s3 = new S3({ region: 'us-east-1', signatureVersion: 'v4'});