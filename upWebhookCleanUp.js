// Import webhook functions
const upWebhookDelete = require("./upWebhookDelete.js");
const upWebhookList = require("./upWebhookList.js");

async function cleanUpWebhooks() {
    // Get a list of all active webhooks
    try {
        let webhookList =  await upWebhookList.getWebhooks();
        // console.log(webhookList);
            // For each ID in the array, delete the ID
        for (i in webhookList) {
            upWebhookDelete.deleteWebhook(webhookList[i]);
        }
        console.log("All Webhooks Deleted");
    }catch (error) {
        console.log(error);
    }
}

cleanUpWebhooks()

module.exports = {cleanUpWebhooks}