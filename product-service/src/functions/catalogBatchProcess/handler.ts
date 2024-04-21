import type { SQSEvent, SQSRecord } from 'aws-lambda';
import { middyfy2 } from '@libs/lambda';
import { putItem } from '@libs/dynamodb-handlers';
import { sns } from '@libs/aws-sdk-services';
import { formatJSONResponse } from '@libs/api-gateway';


const catalogBatchProcess = async (event: SQSEvent) => {
  const promises = event.Records.map(async (record: SQSRecord) => {
    const product = JSON.parse(record.body);
    await sns.publish({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: `${JSON.stringify(product)}`,
      Subject: 'Product created',
    }).promise();
    await putItem(product, process.env.PRODUCTS_TABLE);
  });

  const result = await Promise.all(promises);
  return formatJSONResponse({ body: result, status: 201 });
};

export const main = middyfy2(catalogBatchProcess);
