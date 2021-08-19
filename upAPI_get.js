const https = require('https');

// Define API GET request function
function get_transaction(transactionId){
  const options = {
  hostname: 'api.up.com.au',
  path: '/api/v1/transactions/'+transactionId,
  method: 'GET',
  headers: {
      'Authorization': 'Bearer up:yeah:6tuNxEg67TscZvN6xgT9FwfJf5n65CImbCQfCa8Xkc3YsZBSH8Csli1SAB9C9S3myfPyWGrnHOXGdZMGXvPjdQbyy3ZSQvTmdPnYoE41mIWrktOkg9dWVHJ2OZaWV0aa'
    }
  }

  const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => {
    process.stdout.write(d)
    })
  })

  req.on('error', error => {
  console.error(error)
  })

  req.end()
}

module.exports = {get_transaction};