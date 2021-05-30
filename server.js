// var con = require('./db_connect.js');
var express = require("express");
var app = express();
var fs = require('fs');
var cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const routes = require('./routes/routes')(app, fs);

//create server and listen on port 8081
var server = app.listen(80, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application listening at http://%s:%s", host, port)
});

//handle uncaught errors to avoid server crashing
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
  })

