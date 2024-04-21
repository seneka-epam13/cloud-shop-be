import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  const {status, ...rest} = response;

  if (rest.method === 'OPTIONS') {
    // Preflight request. Reply successfully:
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(rest.body),
    };
  } else {
    return {
      statusCode: status as number,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this to a specific domain for better security
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
      },
      body: JSON.stringify(rest.body),
    };
  }
}
