var mongoose = require('mongoose');
var productSchema = mongoose.Schema({

    data            : {
        name        : String,
        description     : String,
        short_desc : String
    },
    photo         : {
        url           : String,
        altText        : String
    }
});


// create the model for products and expose it to our app
var Product = mongoose.model('products', productSchema);

var shoes = new Product({
	data            : {
        name        : 'Jordans',
        description     : 'Dope Shoes',
    },
    photo         : {
        url           : 'http://www.google.com',
        altText        : 'picture of shoes'
    }
});

shoes.save(function (err, shoes) {
  if (err) return console.error(err);
});