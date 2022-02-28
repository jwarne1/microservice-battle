// Retrieves a list of all configured webhooks, requires authentication
const https = require('https');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();


async function getWebhooks() {
    return new Promise(async(resolve, reject) => {
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

        var data = '';
        var webhookList = [];
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            try {
                res.on('data', chunk => {
                    data += chunk;
                })
                res.on('end', () => {
                    var webhookData = JSON.parse(data);

                    for (i in webhookData.data) {
                        webhookList.push(webhookData.data[i].id)
                    }
                    console.log(webhookList);
                    resolve(webhookList);
                })
            } catch (error) {
                reject(error);
            }
        })

        req.on('error', error => {
            reject(error);
        })

        req.end();
    });
}

// getWebhooks();

module.exports = { getWebhooks };