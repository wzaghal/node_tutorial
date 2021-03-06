// Base Setup
//===========

//call the packages we need
var express = require('express'); //call express
var app = express();			  //define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');




//connect to our database
mongoose.connect('mongodb://wzaghal:'+process.env.MONGODB_PASSWORD+'@ds049848.mongolab.com:49848/users');

var Bear = require('./models/bear');

//configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser());
var port = process.env.PORT || 8080; //set our port

//Routes for our API
//=================
var router = express.Router(); //get an instance of the express Router

router.use(function(req, res, next){
	//do logging
	console.log('Something is happening: ' + process.argv + ' ' + process.env.MONGODB_PASSWORD);
	next(); //make sure we go to the next routes and don't stop here
});


//test router to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api' });

});

// on routes that end in /bears //
//================================
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
		
	})

	.get(function(req, res){

		Bear.find(function (err,bears){
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id

router.route('/bears/:bear_id')

.get(function(req, res){
	Bear.findById(req.params.bear_id, function(err,bear){
		if (err)
			res.send(err);

		res.json(bear);
	});
})

.put(function(req, res){
	Bear.findById(req.params.bear_id, function(err, bear){
		if (err)
			res.send(err);

		bear.name = req.body.name; //update bears info

		//save the bear

		bear.save(function(err){
			if (err)
				res.send(err);

			res.json({ message: 'Bear updated'});
		});

	});

})

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
.delete(function(req, res) {
	Bear.remove({
		_id: req.params.bear_id
	}, function(err, bear) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});


// Register our routes
//====================
app.use('/api', router);

//Start the server
//===============

app.listen(port);
console.log('Magic happens on port' + port);
	console.log('Something is happening: ' + process.env.MONGODB_PASSWORD);