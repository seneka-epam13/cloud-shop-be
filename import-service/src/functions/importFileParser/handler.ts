
import csvParser from 'csv-parser';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfyS3 } from '@libs/lambda';
import { s3, sqs } from '@libs/awsServices';


const importFileParser = async (event) => {
  for (const record of event.Records) {
    const s3Stream = s3.getObject({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    }).createReadStream();

    s3Stream
      .pipe(csvParser())
      .on('data', async (data) => {
        await sqs.sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(data),
        }).promise();
      })
      .on('end', () => {
        console.log(`Parsing of ${record.s3.object.key} is completed`);
      });
  }

  return formatJSONResponse({
    message: 'Parsing started',
    status: 200,
  });
};

export const main = middyfyS3(importFileParser);