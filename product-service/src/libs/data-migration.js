const { putItem, scanTable, getItem } =  require('./dynamodb-handlers');
const productList = require('../mockProductList.json')
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';



const products = productList.map(({ count, ...product }) => product);

const stocks = productList.map(({ id, count }) => ({
  product_id: id,
  count
}));

async function isTableEmpty(tableName) {
    const data = await scanTable(tableName)
    console.log(data?.length === 0, "DSAD")
    return data?.length === 0;
  }
  
  async function fillTable(tableName, items) {
    if (await isTableEmpty(tableName)) {
      await Promise.all(items.map(item => putItem(item, tableName)));
    } else {
      console.log(`Table ${tableName} is not empty.`); 
    }
  }
  
  fillTable('Products', products);
  fillTable('Stocks', stocks);
  