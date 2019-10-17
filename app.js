// reference to the required packages
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
// reference to the routers
let actors = require('./routers/actor');
let movies = require('./routers/movie');

// create an app from express.js and configure it
let app = express();
app.listen(8080);

let path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

// ask mongoose to connect to a db named 'movies'
mongoose.connect('mongodb://localhost:27017/lab9', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
    if (err) return console.log('Mongoose - connection error:', err);
    console.log('Successful Connection');
});

/** ************************************************************************
 *             CONFIGURING ENDPOINTS
 * open each in its own tab on POSTMAN to go back and forth for references
 *********************************************************************** **/

app.post('/movies', movies.createOne);//works
app.post('/actors', actors.createOne);//works
app.post('/actors/:idA/:idM', actors.addMovie);//works
app.post('/movies/:title/:name', movies.addActor);//works

app.get('/actors', actors.getAll);//works   
app.get('/movies', movies.getAll);//works
app.get('/actors/:id', actors.getOne);//works
app.get('/movies/:id', movies.getOne);//works
app.get('/movies/:year1/:year2', movies.getMovies);//works

app.put('/movies/:id', movies.updateOne);//works
app.put('/actors/:id', actors.updateOne);//works
app.put('/actors/:idA/:idM', actors.removeMovie);//works
app.put('/movies/:idM/:idA', movies.removeActor);//works

//app.delete('/actors/:id', actors.deleteOne);//works
app.delete('/movies/:id', movies.deleteMovie);//works
app.delete('/actors/:id', actors.deleteActor);//works
app.delete('/movies/year/:year', movies.deleteByYear);