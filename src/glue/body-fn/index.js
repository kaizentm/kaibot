const request = require('sync-request');
require("dotenv").config();
const github_repo = process.env.GITHUB_REPOSITORY
const github_token = process.env.GITHUB_TOKEN
const github_url = "https://api.github.com/repos/" + github_repo;
const auth_headers = {'User-Agent': 'request', 'authorization': 'token ' + github_token , 'accept': 'application/vnd.github.antiope-preview+json'}

module.exports = async function (context, req) {
    console.log(auth_headers);
    const url = github_url + "/dispatches"
    // data = {event_type: 'Full test', client_payload: {"payload":req.body.message}}
    data = {"event_type": "Full test"}
    responseMessage = request('POST', url, {headers: auth_headers, json: data});
    buf = Buffer.from(responseMessage.body)
    console.log(buf.toString());
    
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

// curl -H "authorization: token " -H "accept: application/vnd.github.antiope-preview+json" --data '{"event_type": "Full test", "client_payload": {"name":"awesome"}}' https://api.github.com/repos/kaizentm/kaibot/dispatches
// curl -H "authorization: token " -H "accept: application/vnd.github.antiope-preview+json" --data '{"event_type": "Full test"}' https://api.github.com/repos/kaizentm/kaibot/dispatches