/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
var mongoose = require('mongoose');
var User = require('../datasets/users.js');

module.exports.signup = function (req, res){
    var user = new User(req.body);
    user.save();

    res.json(req.body);
}

module.exports.login = function (req,res)
{
    User.find(req.body, function(err, results)
    {
        if (err)
        {
            console.log("Error Out");
        }
        else if (results && results.length === 1)
        {
            res.json(req.body.email);
        }
    })
}>