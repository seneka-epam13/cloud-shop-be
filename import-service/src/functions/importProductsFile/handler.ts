
import { formatJSONResponse } from '@libs/api-gateway';
import { s3 } from '@libs/awsServices';
import { middyfy } from '@libs/lambda';



const importProductsFile = async (event) => {
  const fileName = event.queryStringParameters.name;
  const params = {
    Bucket: 'task-5-bucket',
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  const signedUrl = await s3.getSignedUrlPromise('putObject', params);

  return formatJSONResponse({
    body: signedUrl,
    status: 200
  });
};

export const main = middyfy(importProductsFile);