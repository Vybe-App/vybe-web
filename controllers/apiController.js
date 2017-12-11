
var Applications = require('../models/appModel');
var Emails = require('../models/emailModel');
var Tokens = require('../models/emailTokenModel');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


//////// API METHODS ///////////////

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));


  //RETREIVE A MOBILE APP BY IT'S ID
  app.get('/api/apps/:id', function(req, res){

    Applications.findById({ _id: req.params.id},

      function(err, application){
        if(err) throw err;

        res.send(application);
      });
    });

    //DISPLAY ALL APPS IN THE DB
    app.get('/api/displayapps', function(req, res){

        Applications.find({},function(err, applications) {
          console.log(err)
          res.send(applications);
        });
      });

    //ADD NEW MOBILE APP TO DB
    app.post('/api/apps', function(req, res){

      if(req.body.id){
        //update existing App within DB
        Applications.findByIdAndUpdate(
          req.body.id, {
            appName: req.body.appName,
            appDescription: req.body.appDescription,
            appReview: req.body.appReview,
            upvoteCount: req.body.upvoteCount,
            downvoteCount: req.body.downvoteCount,
            category: req.body.category,
          },

             function(err, todo){
              if(err) throw err;

              res.send('Successfully updated app within database');
          });
      }
      else{
        //Create new App
        var newApp = Applications({
          appName: req.body.appName,
          appDescription: req.body.appDescription,
          appReview: req.body.appReview,
          upvoteCount: req.body.upvoteCount,
          downvoteCount: req.body.downvoteCount,
          category: req.body.category,
        });

        newApp.save(function(err){
          if (err) throw err;
          res.send('successfully added app to database ');
        });
      }
  });






  //EMAIL VERIFICATION METHODS - MOVE THESE TO NEW CONTROLLER FOR THEIR RESPECTIVE ROUTES

  //   app.post('/api/registeremail', function(req, res){
  //     req.assert('email', 'Email is not valid').isEmail();
  //     req.assert('email', 'Email cannot be blank').notEmpty();
  //     req.sanitize('email').normalizeEmail({ remove_dots: false });
  //
  //     // Check for validation errors
  //     var errors = req.validationErrors();
  //     if (errors) { return res.status(400).send(errors); }
  //
  //
  //     // Make sure this email doesn't already exist in our system
  //     Emails.findOne({ email: req.body.email }, function (err, email) {
  //
  //     // Make sure email doesn't already exist
  //     if (email) return res.status(400).send({ msg: 'The email address you have entered is already in our system' });
  //
  //     // Create and save the email
  //     email = new Emails({ email: req.body.email });
  //     email.save(function (err) {
  //       if (err) { return res.status(500).send({ msg: err.message }); }
  //
  //       // Create a verification token for this user
  //       var token = new Tokens({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
  //
  //       // Save the verification token
  //      token.save(function (err) {
  //          if (err) { return res.status(500).send({ msg: err.message }); }
  //
  //          // Send the email
  //          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
  //          var mailOptions = { from: 'no-reply@appxchnge.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
  //          transporter.sendMail(mailOptions, function (err) {
  //            if (err) { return res.status(500).send({ msg: err.message }); }
  //            res.status(200).send('A verification email has been sent to ' + user.email + '.');
  //              });
  //          });
  //      });
  //   });
  // }



}
