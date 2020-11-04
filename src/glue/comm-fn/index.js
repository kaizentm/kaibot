// const df = require("durable-functions");
const request = require('sync-request');
const brain_url = 'https://kaibotbrain.azurewebsites.net/api/brain-fn'; 
require("dotenv").config();

module.exports = async function (context, req) {

    const head_name = req.body.name
    var mouth_url_var_name = head_name + '_MOUTH_URL';
    mouth_url_var_name = mouth_url_var_name.toUpperCase();
    const mouth_url = process.env[mouth_url_var_name];
    
    const responseMessage = request('POST', brain_url , {json: {'name':head_name, 'message': req.body.message}});
    buf = Buffer.from(responseMessage.body)
    console.log(buf.toString());

    
    // const responseMessage = 'hello'
    // yield context.df.callActivity("ApproveTask",  taskId)
    
    // const responseMessage = head_name + ",You have just said " + req.body.message; 
    
    request('POST', mouth_url, {body: buf.toString()});
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: buf.toString()
    };
}