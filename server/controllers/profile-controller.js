/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function(req, res)
{
    var file = req.files.file;
    var userId = req.body.userId;

    console.log("User: " + userId + " is submitting: " + file)
    var uploadDate = new Date().toISOString().slice(0,19).replace(/-|:/g,""); //Bruger date til at skabe en unik file name!

    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/profile/" + userId +  uploadDate + file.name);
    var savePath = "/uploads/profile/" + userId + uploadDate + file.name;

    fs.rename(tempPath, targetPath, function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            User.findById(userId, function(err, userData)
            {
                var user = userData;
                console.log(user);
                user.image = savePath;
                user.save(function(err)
                {
                    console.log(targetPath);

                    if (err)
                    {
                        console.log("failed to save img")
                        res.json({status: 500}) //wiki siger at 500 = oh fuck!
                    }
                    else
                    {
                        console.log("saving img successful");

                        res.json({status: 200}) //wiki siger at 200 = success
                    }
                })
            })
        }

    });
};


module.exports.updateUsername = function (req, res)
{
    var username = req.body.username;
    var userId = req.body.userId;

    User.findById(userId, function (err, userData)
    {
        var user = userData;
        user.username = username;

        user.save(function(err)
        {
            if (err)
            {
                console.log("fail");
                res.json({status: 500}); //ifølge wiki er 500 = oh fuck
            }
            else
            {
                console.log("success");
                res.json({status: 200});//ifølge wiki er 200 = success!
            }
        })
    });
};

module.exports.updateBio = function (req, res)
{
    var bio = req.body.bio;
    var userId = req.body.userId;

    User.findById(userId, function (err, userData)
    {
        var user = userData;
        user.bio = bio;

        user.save(function(err)
        {
            if (err)
            {
                console.log("fail");
                res.json({status: 500});
            }
            else
            {
                console.log("success");
                res.json({status: 200});
            }
        })
    });
};
