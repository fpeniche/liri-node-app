
require("dotenv").config();


  var keys = require("./keys.js");
  var Spotify = require('node-spotify-api');
  
  var spotify = new Spotify(keys.spotify);

  var concert = process.argv[2];
  var spotifySong = process.argv[2];
  var movie = process.argv[2];
  var doIt = process.argv[2];
  var term = process.argv.slice(3).join(" ");


  var Song = function()
  {
      // divider will be used as a spacer between the song data we print in log.txt
        var divider = "\n------------------------------------------------------------\n\n";

        this.findSong = function(term) 
        {
            spotify.search({ type: 'track', query: term, limit: 10 }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
                    console.log(data); 
              });

               // var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;
            
              //  axios.get(URL).then(function(response) {
                  // Place the response.data into a variable, jsonData.
                  
            
                  // showData ends up being the string containing the show data we will print to the console
               //   var showData = [
             //       "Show: " + jsonData.name,
               //     "Genre(s): " + jsonData.genres.join(", "),
                 //   "Rating: " + jsonData.rating.average,
                //    "Network: " + jsonData.network.name,
                //    "Summary: " + jsonData.summary
                //  ].join("\n\n");
            
                  // Append showData and the divider to log.txt, print showData to the console
               /*   fs.appendFile("log.txt", jsonData + divider, function(err) {
                    if (err) throw err;
                    console.log(jsonData);
                  }); */
                }
        };

        if (spotifySong === "spotify") 
        {
            console.log("Searching for spotify song");
            console.log(term);
            var song = new Song();
            song.findSong(term);
          };

// call to the omdb api

          if(movie === "movie-this")
          {
          var axios = require("axios");

          // Then run a request with axios to the OMDB API with the movie specified
          axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log(response.data);
                console.log("Title of the movie is: " + response.data.Title);
                console.log("The movie's rating is: " + response.data.imdbRating);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language of the movie: + " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);

            })
            .catch(function(error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });  

        };


        if(concert === "concert-this")
        {
            var bandsintown = require('bandsintown');
            var axios = require("axios");

            // Querying the bandsintown api for the selected artist, the ?app_id parameter is required
           axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
            
            .then(function(response) {
                console.log(response.data[0]);
                console.log("The venue of the next concert for " + response.data[0].lineup + " is: " + response.data[0].venue.name);
                console.log("The location of the venue is: " + response.data[0].venue.country + ", " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("The date of the event is: " + response.data[0].datetime);

           })
           .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });  
          //  bandsintown.getArtistEventList(term)
          //       .then(function(events) {
                    
                
            
        }