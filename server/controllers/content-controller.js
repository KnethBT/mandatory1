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

    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/content/" + file.name);
    var savePath = "/uploads/content/" + file.name;

    fs.rename(tempPath, targetPath, function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            //return savePath
        }

    });
};

//Upload Content:
module.exports.postContent = function (req, res)
{
    var content = new Content(req.body);
    content.save();

    Content.find({})
        .sort({date: -1}).exec(function(err, allContents) //sorteret med den nyeste først
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
        .sort({date: -1}) //sorteret med den nyeste først
        .exec(function(err, allContents)
        {
            if (err)
            {
                res.error(err);
            }
            else
            {
                res.json(allContents);
            }
        })
}