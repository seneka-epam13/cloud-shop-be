import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { putItem } from "src/libs/dynamodb-handlers";
import { v4 as uuidv4 } from 'uuid';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const product = event.body;
  const { title, description, price, count = 0 } = product 
  const id = uuidv4();

  const productItem = {id, title, price, description}
  const stockItem = {id, count}

  try {
    await putItem(productItem, process.env.PRODUCTS_TABLE);
    await putItem(stockItem, process.env.STOCKS_TABLE);
    return formatJSONResponse({ body: product, status: 201, method: event.httpMethod });
  } catch (err) {
    return formatJSONResponse({
      message: "Unable to create product",
      status: 500,
    });
  }
};

export const main = middyfy(createProduct);
