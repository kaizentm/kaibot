const request = require('sync-request');
require("dotenv").config();

module.exports = async function (context, req) {
        const appID = process.env.LUIS_APP_ID;
        const key = process.env.LUIS_SUBSCRIPTION_KEY;
        const region = process.env.LUIS_REGION;
        const messageText = req.body.message; 

        const url = `https://kaibotluis.cognitiveservices.azure.com/luis/prediction/v3.0/apps/${appID}/slots/production/predict?subscription-key=${key}&verbose=true&show-all-intents=true&log=true&query=${messageText}`;
        const body_url = `https://kaibot.azurewebsites.net/api/body-fn`;
        context.log(`the url ${url}`);
    
        const head_name = req.body.name

        const response = request('GET', url);
        context.log(`Failed to analyse intent with luis, error ${response}`);
        buf = Buffer.from(response.body)
        const prediction = JSON.parse(buf);
        const intent = prediction.prediction.topIntent;         
        
        if (intent === 'end_to_end_test' && prediction.prediction.intents.end_to_end_test.score > 0.4) {
            responseMessage = `Sure ${head_name}, I am running end-to-end tests`;
            request('GET', body_url);
        } else {
            responseMessage = `${head_name}, you gotta be kidding me`;
        }
       
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    

}