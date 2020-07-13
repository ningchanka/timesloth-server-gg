const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');

var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(express.json());

var tempData = [];

app.get('/', (req, res) => {
    res.send('<h1>Hello Timesloth Server World</h1>');
});

app.get('/notifications', (req, res) => {
  res.send(tempData);
});

app.post('/notifications', (req, res) => {
  tempData.push({
    "headers": req.headers,
    "body": req.body
  });
  res.send(tempData);
});

//assuming app is express Object.
app.get('/notifications/google1a3c5768b5a8f586.html',function(req,res) {
  res.sendFile(path.join(__dirname+'/google1a3c5768b5a8f586.html'));
});

//assuming app is express Object.
app.get('/google1a3c5768b5a8f586.html',function(req,res) {
  res.sendFile(path.join(__dirname+'/google1a3c5768b5a8f586.html'));
});

const port = process.env.PORT || 9009
const portSSL = process.env.PORT_SSL || 9008

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => console.log(`Listening on port ${port}...`) );
httpsServer.listen(portSSL, () => console.log(`Listening on portSSL ${portSSL}...`) );

// app.listen(port, () => console.log(`Listening on port ${port}...`) );