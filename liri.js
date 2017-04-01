// GLOBAL VARIABLES

var userCommand = process.argv[2];
var userInput = process.argv[3];

function getTweets() {

	var keys = require('./key.js');

	var Twit = require('twitter');

	var spotify = require('spotify');

	var client = new Twit(keys.twitterKeys);

	client.get('search/tweets',{q: 'Zrilling'},function(err, data, response) {
   	console.log(data);
	});
};

function spotifySong(){
  if (userInput === undefined) {
      spotify.search({type: 'track', query: '"The+Sign" artist:"Ace+of+Base"&limit=5'}, function (err,data) {
        if (err) {
          return console.log(err);
        } else {
          // console.log(data); console.log('Artist:', data.tracks.items[0].artists[0].name)
          console.log('Track:', data.tracks.items[0].name);
          console.log('Preview Link:', data.tracks.items[0].preview_url);
          console.log('Album:', data.tracks.items[0].album.name);
          }
      });
  } else {
      spotify.search({type: 'track', query: userInput + '&limit=5'}, function (err,data) {
        if (err) {
          return console.log(err);
        } else {
          if (data.tracks.items.length === 0) {
            return console.log('Track not found, please try again');
          }
          // console.log(data);
          console.log('Artist:', data.tracks.items[0].artists[0].name);
          console.log('Track:', data.tracks.items[0].name);
          console.log('Preview Link:', data.tracks.items[0].preview_url);
          console.log('Album:', data.tracks.items[0].album.name);
        }
      });
  }
}

function movieThis() {
	var request = require('request');

	var imdbUrl = 'http://www.omdbapi.com/?t=' + userInput +'&y=&plot=short&r=json';
	// var tomatoUrl =

	console.log(imdbUrl);

	request(imdbUrl, function(error, response, body){
		if (!error && response.statusCode == 200 && userInput != undefined) {
			var movieInfo = ['Title', 'Year', 'imdbRating', 'Country', 'Language', 'Plot', 'Actors'];

			for (var i = 0; i < movieInfo.length; i++) {
				console.log(JSON.parse(body)[movieInfo[i]]);
			}

			// request(tomatoUrl, function(error, response, body){
			// 	console.log(JSON.parse(body));
			// });

			console.log('https://www.rottentomatoes.com/search/?search='+ userInput);

		} else {
			userInput = 'Mr Nobody';
			movieThis();
		}
	});
};

function doWhatItSays() {
	var fs = require('fs');

	var writeThis = [process.argv[3], process.argv[4]];

	fs.writeFile('random.txt', writeThis, function(error){
		if (error) {
			console.log('error');
		} else {
			console.log('created the file');
		}
	});

	fs.readFile('random.txt', {encoding: 'utf8'}, function(err, data) {
		if (err) {
			return console.log(err);
		} else {

			var array = data.split(',');

			userCommand = array[0];
			userInput = array [1];

			switchCase();

		}
	})
};

function switchCase() {
	switch (userCommand){
		case 'my-tweets': getTweets();
		break;

		case 'spotify-this-song': spotifySong();
		break;

		case 'movie-this': movieThis();
		break;

		case 'do-what-it-says': doWhatItSays();
		break;
	}
}

switchCase();
