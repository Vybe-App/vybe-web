//Contains model for each "app" object

var mongoose = require('mongoose');
var Schema = mongoose.Schema; //mongoose provided schema object

var appSchema = new Schema({
  appName: String,
  appDescription: String,
  appReview: String,
  upvoteCount: Number,
  downvoteCount: Number,
  category: String,
});

var MobileApps = mongoose.model('MobileApps', appSchema);
module.exports = MobileApps;

//Extended schemas for future use

//    name: "RobinHood",
//    description: "{description of the app}",
//    review: {Our review of the app},
//    image: "{URL of app icon}",
//    votecount: "357",
//    category: "Finance"
//    AppStoreLink "{URL to app store}"
//    GooglePlayStoreLink: "{URL for android}"
//    DatePosted: "9-21-2017"
//    commentCount: 400

// Comments: {
//            Poster: "{poster username}",
//            Comment: "i liked this app",
//            CommentvoteCount: "88",           }
// }
