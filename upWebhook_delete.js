// Script to test successful deployment of the webhook 
// Executing this will send a transaction to the webhook
const https = require('https');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

// ID of Webhook that needs to be deleted
var webhookId = "0e3fae1d-ffa1-41f3-8f41-d7427fce3008";

async function deleteWebHook() {
  // Retrieve authentication token from secret manager
  // Access secret manager to retreive user auth token from UP
  const [accessResponse] = await client.accessSecretVersion({
    'name': 'projects/660173564271/secrets/UP-auth-token/versions/latest',
  });
  const authToken = accessResponse.payload.data.toString('utf8');
  const options = {
    hostname: 'api.up.com.au',
    path: '/api/v1/webhooks/'+webhookId,
    method: 'DELETE',
    headers: {
      'Authorization': authToken,
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

deleteWebHook();