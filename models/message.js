var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const Message = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true},
  username: { type: String, required: true },
  createdAt: { type: String }
});

Message.virtual('time')
  .get(function(){
    return this.createdAt.getUTCHours().toString() + ':' + this.created_at.getUTCMinutes().toString() + ':' + this.created_at.getUTCSeconds().toString() ;
  });

Message.virtual('date')
  .get(function(){
    return this.createdAt.toDateString();
  });

Message.virtual('delurl')
  .get(function(){
    return '/post/delete/' + this._id;
  })


module.exports = mongoose.model('Message', Message);