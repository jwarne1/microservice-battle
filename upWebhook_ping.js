const https = require('https');
const webhookId = 'c4e9e716-8bc9-40ca-8983-38a465b0a190';

const options = {
  hostname: 'api.up.com.au',
  path: '/api/v1/webhooks/'+webhookId+'/ping',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer up:yeah:6tuNxEg67TscZvN6xgT9FwfJf5n65CImbCQfCa8Xkc3YsZBSH8Csli1SAB9C9S3myfPyWGrnHOXGdZMGXvPjdQbyy3ZSQvTmdPnYoE41mIWrktOkg9dWVHJ2OZaWV0aa',
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