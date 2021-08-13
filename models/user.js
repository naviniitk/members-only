var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, required: true }
});

User.virtual('url')
  .get(function(){
    return '/user/' + this._id;
  });

module.exports = mongoose.model('User', User);