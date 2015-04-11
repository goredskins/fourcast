var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our product model
var userSchema = mongoose.Schema({

    data            : {
        name        : String,
        description     : String,
    },
    photo         : {
        url           : String,
        altText        : String
    }
});


// create the model for products and expose it to our app
module.exports = mongoose.model('Product', productSchema);