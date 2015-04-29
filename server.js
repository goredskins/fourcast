// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var fs = require('fs')
var serveStatic = require('serve-static')
app.use(express.static(__dirname+'/public'));

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'fourcast_secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// mongoose.connect('mongodb://localhost:27017/mydb', function (error) {
//     if (error) {
//         console.log(error);
//     }
// });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

var productSchema = mongoose.Schema({

    data : {
        name : String,
        description : String,
        short_desc : String,
        price: String,
        user: String
    },
    photo : {
        featured: String,
        url1 : String,
        url2 : String,
        url3 : String
    }
});


// create the model for products and expose it to our app
var Product = mongoose.model('products', productSchema);
// Product.remove({}, function(err) {
//       if(err) { console.log("Error removing"); }});


//in case we want to prevent from adding the same product twice, we're going to ignore this problem for now
// productSchema.pre('save', function (next) {
//     var self = this;
//     Product.find({name : self.name}, function (err, docs) {
//         if (!docs.length){
//             next();
//         }else{                
//             console.log('product exists: ');
//             next();
//         }
//     });
// }) ;

var products = [new Product({
	data            : {
        name        : 'Designer Shoes',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'shoes',
        price : '$99.99',
        user: 'alf2fr@virginia.edu'
    },
    photo         : {
        featured: 'shoe2.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
	data            : {
        name        : 'Sneakers',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'sneakers',
        price: '$69.99',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'shoe3.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Blue/Black Dress',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'dress',
        price: '$99.00',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'dress.png',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Blue Jeans',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'jeans',
        price: '$80.00',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'jeans.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Expensive Shoes',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'expensive-shoes',
        price: '$325.00',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'shoe.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Sweater',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'sweater',
        price: '$59.00',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'sweater.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Normal Dress',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'normal-dress',
        price: '$56.00',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'dress2.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Pants',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'pants',
        price: '$69.99',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'pants.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'Shirt',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'shirt',
        price: '$49.99',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'shirt.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'Blue Sweater',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'blue-sweater',
        price: '$89.99',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'sweater2.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'Black Dress',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'black-dress',
        price: '$99.99',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'dress3.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'White Sweater',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'white-sweater',
        price: '$69.99',
        user: 'nthilly23@gmail.com'
    },
    photo  : {
        featured: 'sweater3.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'Fancy Dress',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'fancy-dress',
        price: '$169.99',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'dress2.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}), Product({
    data            : {
        name        : 'Cool Shoes',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'cool-shoes',
        price: '$69.99',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'shoe2.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Fancy Jeans',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'fancy-jeans',
        price: '$80.00',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'jeans.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
}),
new Product({
    data            : {
        name        : 'Comfortable Sneakers',
        description     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        short_desc : 'comfortable-sneakers',
        price: '$79.99',
        user: 'alf2fr@virginia.edu'
    },
    photo  : {
        featured: 'shoe3.jpg',
        url1 : 'http://placehold.it/800x500&text=first%20product%20image',
        url2 : 'http://placehold.it/800x500&text=second%20product%20image',
        url3 : 'http://placehold.it/800x500&text=third%20product%20image'
    }
})
];

// shoes.save(function (err, shoes) {
//   if (err) return console.error(err);
// });

products.forEach(function(element, index, array) {
    //console.log(index);
    element.save(function (err, shoes) {
        if (err) return console.error(err);
    })
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/products', function (req, res) {
    Product.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/products/:short_desc', isLoggedIn, function (req, res) {
    if (req.params.short_desc) {
        Product.find({ 'data.short_desc': req.params.short_desc }, function (err, docs) {
        	console.log(docs[0]);
		 	res.render('product.ejs', {
		            product : docs[0],
		            user : req.user
		        });
        });
    }
});

app.get('/home', isLoggedIn, function(req, res) {
    Product.find({}, function (err, docs) {
        console.log("-------------finding----------");
        console.log(docs);
        console.log("------------------ after ----------------");
        res.render('home.ejs', {
            user : req.user,
            products: docs
        });
    });
    console.log(req.user);
});

app.get('/profile', isLoggedIn, function(req, res) {
    Product.find({ 'data.user': 'nthilly23@gmail.com' }, function (err, docs) {
        console.log(docs[0]);
        res.render('profile.ejs', {
                user : req.user,
                products : docs
            });
    });
});

// launch ======================================================================
app.listen(port);
console.log('Listening on port ' + port);