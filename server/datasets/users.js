/**
 * Created by KennethBovbjerg on 04-11-2015.
 */

var mongoose = require('mongoose');
module.exports = mongoose.model('User',
    {
        email: String,
        username: String,
        password: String //IKKE en smart måde at gemme kode på!
    });
