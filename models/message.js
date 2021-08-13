var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const Message = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true},
  username: { type: String, required: true },
  createdAt: { type: Date }
});


Message.virtual('date')
  .get(function(){
    return this.createdAt.toLocaleDateString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minutes: "2-digit",
    });
  });

Message.virtual('delurl')
  .get(function(){
    return '/post/delete/' + this._id;
  })


module.exports = mongoose.model('Message', Message);