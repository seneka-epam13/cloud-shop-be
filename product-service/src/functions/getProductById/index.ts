
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        request: {
          parameters: {
            paths: {
              productId: true,
            },
          },
        },
      },
    },
  ],
};
