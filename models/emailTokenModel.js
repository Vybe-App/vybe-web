var mongoose = require('mongoose');
var Schema = mongoose.Schema; //mongoose provided schema object


const tokenSchema = new Schema({
    _emailId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'emails' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

//Token schema - will expire in 12 hours if user has not verified email

var Tokens = mongoose.model('tokens', tokenSchema);
module.exports = Tokens;
