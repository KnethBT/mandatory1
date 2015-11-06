/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Content',
    {
        username: String,
        userId: String,
        contentTitle: String,
        contentDescription: String,
        contentImg: String,
        contentScore: {type: Number, default: 1},
        date: {type: Date, default: Date.now}
    });
