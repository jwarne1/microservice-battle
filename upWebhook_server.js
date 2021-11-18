// This is the main script that runs on the cloud run instance
const https = require('https');
const upAPI = require("./upAPI_get.js");
const createWebhook = require("./upWebhook_create")
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

// Retrieve user auth token from secret manager
const [accessResponse] = await client.accessSecretVersion({
  'name': 'projects/660173564271/secrets/UP-auth-token/versions/latest',
});
const authToken = accessResponse.payload.data.toString('utf8');

// Create https server
var data = '';
const server = https.createServer((req, res) => {
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(JSON.parse(data));
    var transactionData = JSON.parse(data);
    var transactionId = transactionData.data.relationships.transaction.data.id;   
    try{
      console.log(transactionId);
      upAPI.get_transaction(transactionId);
    }catch(error){
      console.log(error)
    }
    res.statusCode = 200;
    res.end();
    })
})

.createWebhook();

console.log("Success!")