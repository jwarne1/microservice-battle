const https = require('https');

// Create UP Webhook
const data = new TextEncoder().encode(
    JSON.stringify({
      data: {
        attributes: {
          url: 'https://ac3b6cd7a854.ngrok.io',
          description: 'Webhook running on ngrok'
        }
      }
    })
  )

const options = {
  hostname: 'api.up.com.au',
  path: '/api/v1/webhooks',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer up:yeah:6tuNxEg67TscZvN6xgT9FwfJf5n65CImbCQfCa8Xkc3YsZBSH8Csli1SAB9C9S3myfPyWGrnHOXGdZMGXvPjdQbyy3ZSQvTmdPnYoE41mIWrktOkg9dWVHJ2OZaWV0aa',
    'Content-Type': 'application/json',
    'Content-Length': data.length
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

req.write(data)
req.end()