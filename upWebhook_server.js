const http = require('http');
const upAPI = require("./upAPI_get.js");
const hostname = '127.0.0.1';
const port = 80;

// Create local http server
var data = '';
const server = http.createServer((req, res) => {
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})