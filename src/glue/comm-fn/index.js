const request = require('sync-request');
// const brain_url = 'http://localhost:4390'; 
require("dotenv").config();
const mouth_url = process.env.MOUTH_URL;

module.exports = async function (context, req) {

    const head_name = req.body.name
    //uncomment when brain is ready
    // const responseMessage = request('POST', brain_url , req.body.message);
    
    const responseMessage = head_name + ",You have just said " + req.body.message; 
    
    request('POST', mouth_url, {body: responseMessage});
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}