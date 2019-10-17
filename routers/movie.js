let mongoose = require('mongoose');
let Actor = require('../models/actor');
let Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Movie.find( function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: new mongoose.Types.ObjectId(req.params.id)}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id)}, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteMovie: function (req, res) {
        Movie.findOneAndRemove({ _id: new mongoose.Types.ObjectId(req.params.id)}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    
    removeActor: function (req, res) {
        Movie.findOne({ _id: new mongoose.Types.ObjectId(req.params.idM)}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: new mongoose.Types.ObjectId(req.params.idA)}, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.remove(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);                   
                });
            })
        });
    },

    addActor: function (req, res) {
        Movie.findOne({ title: req.params.title}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ name: req.params.name}, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);                   
                });
            })
        });
    },

    getMovies: function (req, res) {
        Movie.where('year').gte(req.params.year1).lte(req.params.year2).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteByYear: function (req, res) {
        Movie.deleteMany({year :{$lt: req.params.year}}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        }); 
    },
};