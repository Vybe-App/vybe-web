
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //mongoose provided schema object


var emailSchema = new Schema({
  email: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
});


var emails = mongoose.model('emails', emailSchema);
module.exports = emails;
