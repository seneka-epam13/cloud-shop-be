import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { putItem } from 'src/libs/dynamodb-handlers';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = event.body;

  try {
    await putItem(product, process.env.PRODUCTS_TABLE);
    return formatJSONResponse({ body: product, status: 201 });
  } catch (err) {
    console.error("Unable to create product. Error JSON:", JSON.stringify(err, null, 2));
    return formatJSONResponse({ message: 'Unable to create product', status: 500 });
  }
};


export const main = middyfy(createProduct);


