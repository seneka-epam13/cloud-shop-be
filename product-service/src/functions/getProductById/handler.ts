import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getItem } from 'src/libs/dynamodb-handlers';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;

  const product = await getItem(productId, process.env.PRODUCTS_TABLE)
  const stock = await getItem(productId, process.env.STOCKS_TABLE)

  if (!product) {
    return formatJSONResponse({ message: 'Product not found', status: 404 });
  }

  const result = {
    ...product,
    count: stock?.count || 0
  };

  return formatJSONResponse({ body: result, status: 200 });
};


export const main = middyfy(getProductById);
