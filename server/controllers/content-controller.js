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
    content.contentImg = "/uploads/content/" + content.contentImg;
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
};

module.exports.updateVotes = function (req, res)
{
    var contentId = req.body.contentId;
    var contentScore = req.body.contentScore;
    Content.findById(contentId, function (err, contentData)
    {
        var content = contentData;
        content.contentScore = contentScore;

        content.save(function(err)
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
}