/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
var User = require('../datasets/users');

module.exports.signup = function (req, res)
{
    var user = new User(req.body);
    user.save();

    res.json(req.body);
}

module.exports.login = function (req,res)
{
    User.find(req.body, function (error, results)
    {
        if (error)
        {
            alert(error); //løb tør for tid, normalt vil jeg ikke lave en popup med fejl, men bruge en label eller andet, som er mindre for styrende for brugeren!
            console.log("Error Out");
        }

        if (results && results.length === 1)
        {
            var userData = results[0];
            res.json(
            {
                email: req.body.email,
                _id: userData._id,
                username: userData.username,
                image: userData.image
            });
        }
    })
}