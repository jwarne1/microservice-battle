// Retrieves a list of all configured webhooks, requires authentication
const https = require('https');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();


async function getWebhooks() {
    // Retrieve authentication token from secret manager
    // Access secret manager to retreive user auth token from UP
    const [accessResponse] = await client.accessSecretVersion({
        'name': 'projects/660173564271/secrets/UP-auth-token/versions/latest',
    });
    const authToken = accessResponse.payload.data.toString('utf8');
    const options = {
        hostname: 'api.up.com.au',
        path: '/api/v1/webhooks/',
        method: 'GET',
        headers: {
        'Authorization': authToken,
        },
        description: 'page[size]=1'        
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

getWebhooks();