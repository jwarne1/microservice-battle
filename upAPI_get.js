// Defines a function that makes a GET request to the UP Transaction API
async function getTransaction(transactionId){
  const https = require('https');
  const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
  const client = new SecretManagerServiceClient();

  // Retrieve user auth token from secret manager
  const [accessResponse] = await client.accessSecretVersion({
    'name': 'projects/660173564271/secrets/UP-auth-token/versions/latest',
  });

  const authToken = accessResponse.payload.data.toString('utf8');

  const options = {
  hostname: 'api.up.com.au',
  path: '/api/v1/transactions/'+transactionId,
  method: 'GET',
  headers: {
      'Authorization': authToken
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

module.exports = {getTransaction};