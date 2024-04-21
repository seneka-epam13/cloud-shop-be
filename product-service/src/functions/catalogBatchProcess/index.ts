
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: 'arn:aws:sqs:us-east-1:540921991310:catalogItemsQueue',
        batchSize: 5,
    }
  },
    {
      sns: 'arn:aws:sns:us-east-1:540921991310:createProductTopic'
    }
  ],
};
