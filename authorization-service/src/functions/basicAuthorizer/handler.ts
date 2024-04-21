

export const basicAuthorizer = async (event) => {
  if (!event.authorizationToken) {
    return 'Unauthorized user'
  }
  try {
  const encodedCreds = event.authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username, password] = buff.toString('utf-8').split(':');

  const storedUserPassword = process.env[username];
  const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: event.methodArn,
      }
    ]
  };

  if (effect === 'Allow') {
    return {
      principalId: encodedCreds,
      policyDocument,
    };
  } else {
    return {
      policyDocument,
    };
  }
  

  } catch (e) {
    return 'Unauthorized' + e.message;
  }
};

export const main = basicAuthorizer;