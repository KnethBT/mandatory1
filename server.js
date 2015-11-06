/**
 * Created by KennethBovbjerg on 03-11-2015.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var contentController = require('./server/controllers/content-controller');

mongoose.connect('mongodb://admin:1234@ds047484.mongolab.com:47484/brokerdb');


app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername',profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//Content
app.post('/api/content/uploadPhoto', contentController.uploadPhoto);
app.post('/api/content/post', contentController.postContent);
app.post('/api/content/get', contentController.getContent);

app.listen('3000', function()
{
    console.log("Listening for local Host 3000");
});