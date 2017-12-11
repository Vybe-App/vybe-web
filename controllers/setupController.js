//Use this file for testing db and providing seed data

var Applications = require('../models/appModel');

module.exports = function(app){

  app.get('/api/seed', function(req, res){
    //seed db
    var starterApps = [
      {
        appName: 'Uber',
        appDescription: 'the premier ridesharing-app.',
        appReview: 'Sleek design, fast service. Cheaper fares than the competitor.',
        upvoteCount: 382,
        downvoteCount: 441,
        category:'transportation'
      },
      {
        appName: 'Snapchat',
        appDescription: 'The social media app that everyones been talking about',
        appReview: 'Lifes more fun when you live in the moment :) Happy Snapping!',
        upvoteCount: 2233,
        downvoteCount: 981,
        category:'Social'
      },
      {
        appName: 'Spotify',
        appDescription: 'All music. At your fingertips.',
        appReview: 'Spotify continues to creep into the most used daily apps by everyone, while keeping no trail or indication that its there.',
        upvoteCount: 382,
        downvoteCount: 441,
        category:'transportation'
      }
    ];

    Applications.create(starterApps, function(error, results){ //need to find better syntax for this
      res.send(results);
    });
  });

}
// var appSchema = new Schema({
//   appName: String,
//   appDescription: String
//   appReview: String,
//   upvoteCount: Number,
//   downVoteCount: Number,
//   category: String,
// });
