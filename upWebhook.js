// This is the main script that runs on the cloud run instance
const https = require('https');
const upAPI = require("./upAPI_get.js");
const createWebhook = require("./upWebhook_init.js")

// Create https server to listen to webhook
var data = '';
https.createServer((req, res) => {
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(JSON.parse(data));
    var transactionData = JSON.parse(data);
    var transactionId = transactionData.data.relationships.transaction.data.id;   
    try{
      console.log(transactionId);
      upAPI.getTransaction(transactionId);
    }catch(error){
      console.log(error)
    }
    res.statusCode = 200;
    res.end();
    })
})

// Initialise the webhook
createWebhook();