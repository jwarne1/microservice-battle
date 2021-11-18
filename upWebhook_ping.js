// Script to test successful deployment of the webhook
// Executing this will send a transaction to the webhook
const https = require('https');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

// Set the webhookID to the ID generated from upWebhook_create
const webhookId = 'c4e9e716-8bc9-40ca-8983-38a465b0a190';

async function pingWebHook() {
  // Retrieve authentication token from secret manager
  // Access secret manager to retreive user auth token from UP
  const [accessResponse] = await client.accessSecretVersion({
    'name': 'projects/660173564271/secrets/UP-auth-token/versions/latest',
  });
  const authToken = accessResponse.payload.data.toString('utf8');
  const options = {
    hostname: 'api.up.com.au',
    path: '/api/v1/webhooks/'+webhookId+'/ping',
    method: 'POST',
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
pingWebHook();