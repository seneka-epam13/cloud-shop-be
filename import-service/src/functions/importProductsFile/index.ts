
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: {
          origin: '*',
          headers: ['Access-Control-Allow-Origin', 'Authorization', 'Content-Type'],
        },
        authorizer: {
          name: 'basicAuthorizer',
          arn: 'arn:aws:lambda:us-east-1:540921991310:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
};
