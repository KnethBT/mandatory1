/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Game',
{
    userId: String,
    image: String,
    name: String,
    description: String
});
