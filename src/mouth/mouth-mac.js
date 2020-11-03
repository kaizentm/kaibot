var http = require('http');
const exec = require("child_process").exec
const request = require('sync-request');

http.createServer(function (req, res) {
  let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {        
       console.log(body);
        exec('say '+body, (error, stdout, stderr) => {
});
        
        res.end('ok');
    });
  res.end();
}).listen(4390); 
