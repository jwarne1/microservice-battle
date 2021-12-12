// Import webhook functions
const upWebhookDelete = require("./upWebhook_delete.js");
const upWebhookList = require("./upWebhook_list.js");

async function cleanUpWebhooks() {
    // Get a list of all active webhooks
    try {
        const webhookList =  await upWebhookList.getWebhooks();
        console.log(webhookList);
    }catch (error) {
        console.log(error);
    }
    // For each ID in the array, delete the ID
    for (i in webhookList) {
        upWebhookDelete.deleteWebhook(webhookList[i]);
    }
    console.log("Webhooks Deleted")
}

cleanUpWebhooks()

module.exports = {cleanUpWebhooks}