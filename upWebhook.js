// This is the main script that runs on the cloud run instance
const https = require('https');
const crypto = require('crypto')
const upAPI = require("./upAPI_get.js");
const upWebhookInit = require("./upWebhook_init.js").default
const hostname = '0.0.0.0';
const port = process.env['PORT'] || 80;

// Create https server to listen to webhook
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
      upAPI.getTransaction(transactionId);
    }catch(error){
      console.log(error)
    }
    res.statusCode = 200;
    res.end();
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

// Initialise the webhook
upWebhookInit.createWebhook();