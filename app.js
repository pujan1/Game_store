var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Game =require('./models/game');

// Connect to Mongoose
mongoose.connect('mongodb://<username>:<password>@mongoDB link');  /// insert your db link here
var db = mongoose.connection;

app.get('/api/games', function(req, res){
	Game.getGames(function(err, games){
		if(err){
			throw err;
		}
		res.json(games);
	});
});

app.get('/api/games/:_id', function(req, res){
	Game.getGameById(req.params._id, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.post('/api/games', function(req, res){
	var game = req.body;
	Game.addGame(game, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.put('/api/games/:_id', function(req, res){
	var id = req.params._id;
	var game = req.body;
	Game.updateGame(id, game, {}, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.delete('/api/games/:_id', function(req, res){
	var id = req.params._id;
	Game.removeGame(id, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
