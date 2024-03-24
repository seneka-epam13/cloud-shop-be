import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productList from '../../mockProductList.json';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  const product = productList.find(product => product.id === productId);

  if (!product) {
    return formatJSONResponse({ message: 'Product not found', status: 404 });
  }

  return formatJSONResponse({ product, status: 200 });
};

export const main = middyfy(getProductById);
