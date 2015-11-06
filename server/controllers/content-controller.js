/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
var Content = require('../datasets/content');
var fs = require('fs-extra');
var path = require('path');

//Upload Photo:
module.exports.uploadPhoto = function(req, res)
{
    var file = req.files.file;
    var userId = req.body.userId;

    console.log("User: " + userId + " is submitting: " + file)
    var uploadDate = new Date().toISOString().slice(0,19).replace(/-|:/g,""); //Bruger date til at skabe en unik file name!

    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/content/" + userId +  uploadDate + file.name);
    var savePath = "/uploads/content/" + userId + uploadDate + file.name;

    fs.rename(tempPath, targetPath, function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log($scope);
        }

    });
};

//Upload Content:
module.exports.postContent = function (req, res)
{
//Upload Content:
    var content = new Content(req.body);
    content.save();

    Content.find({})
        .sort({date: -1}).exec(function(err, allContents)
    {
        if (err)
        {
            res.error(err);
        }
        else
        {
            res.json(allContents);
        }
    });
};

module.exports.getContent = function (req, res)
{
    Content.find({})
        .sort({date: -1})
        .exec(function(err, allContents)
        {
            if (err)
            {
                res.error(err)
            }
            else
            {
                res.json(allContents);
            }
        })
}