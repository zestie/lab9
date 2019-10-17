//references
let mongoose = require('mongoose');

let Actor = require('../models/actor');
let Movie = require('../models/movie');

module.exports = {

    // function retrieves all the docs from Actor collection and sends them back as a response
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    // function creates a new document based on the parsed data in the 'req.body' and saves it in 'Actor' collection
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) { 
            res.json(actor); 
        });
    },
    // function finds one document by an ID
    getOne: function (req, res) {
        Actor.findOne({ _id: new mongoose.Types.ObjectId(req.params.id)})
        .populate('movies')                            
        .exec(function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    // function finds a document by its ID and sets new content that is retrieved from 'req.body'
    updateOne: function (req, res) {
        Actor.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, req.body, function (err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    // function deletes the document that mathces the criteria
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: new mongoose.Types.ObjectId(req.params.id)}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    // function adds a movie ID to the list of movies in an actor's document
    addMovie: function (req, res) {
        Actor.findOne({ _id: new mongoose.Types.ObjectId(req.params.idA)}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: new mongoose.Types.ObjectId(req.params.idM)}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    /** *********************************************************
    *                 Lab 8: Added features
    ********************************************************* **/
    
    // delete an actor and all its movies
    deleteActor: function (req, res) {
        Actor.findOneAndRemove({ _id: new mongoose.Types.ObjectId(req.params.id)}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.deleteMany({ actors: req.params.id}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(actor);
            }); 
        })
    },
    // remove a movie from the list of movies in an actor
    removeMovie: function (req, res) {
        Actor.findOne({ _id: new mongoose.Types.ObjectId(req.params.idA)}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: new mongoose.Types.ObjectId(req.params.idM)}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function (err) { 
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    }
};