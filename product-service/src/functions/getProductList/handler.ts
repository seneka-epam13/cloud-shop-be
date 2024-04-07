import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { scanTable } from "@libs/dynamodb-handlers";

const getProductList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const products = await scanTable(process.env.PRODUCTS_TABLE);
    const stocks = await scanTable(process.env.STOCKS_TABLE);

    const productList = products.map((product) => ({
      ...product,
      count:
        stocks.find((stock) => stock.product_id === product.id)?.count || 0,
    }));

    return formatJSONResponse({
      status: 200,
      body: productList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const main = middyfy(getProductList);
