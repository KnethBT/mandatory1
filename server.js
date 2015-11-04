/**
 * Created by KennethBovbjerg on 03-11-2015.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');

mongoose.connect('mongodb://admin:1234@ds047484.mongolab.com:47484/brokerdb');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
   // console.log(__dirname)
});

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

app.listen('3000', function()
{
    console.log("Listening for local Host 3000");
});