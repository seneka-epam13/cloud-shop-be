import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productList from '../../mockProductList.json';

import schema from './schema';

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse({
    status: 200,
    products: productList
  });
};

export const main = middyfy(getProductList);
