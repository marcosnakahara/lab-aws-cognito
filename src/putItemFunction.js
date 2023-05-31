// Use Node.js 16.x runtime
import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js'
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    
    let responseBody = ""
    let statusCode = 0
    
    let {id, price} = JSON.parse(event.body);
    
    const params = {
      TableName : 'TableCognitoLab',
      /* Item properties will depend on your application concerns */
      Item: {
         id: id,
         price: price
      }
    }
    
    try {
        
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Item inserido com sucesso!');
        
    } catch (err) {
          
        statusCode = 200;
        responseBody = JSON.stringify(err);
        
    }
      
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    return response;
};
