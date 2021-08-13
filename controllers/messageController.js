const async = require('async');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Message = require('../models/message');
const { authenticate } = require('passport');

exports.list = function(req, res, next) {
  Message.find({})
    .populate('user', 'username')
    .sort({'createdAt': -1})
    .exec(function(err, list_messages){
      if(err){ return next(err);}
      else{
        res.render('message_list', {message_list: list_messages});
      }
    });
};

exports.create_message_get = function(req, res, next) {
  authenticateUser(req.user, res);
  res.render('message_form');
  return;
};

exports.create_message_post = function(req, res, next) {
  const errors = validationResult(req);
  authenticateUser(req.user, res);
  if(!errors.isEmpty()){
    res.render('message_form', {errors: errors.array(), message: req.body});
    return;
  }
  else{
    var message = new Message({
      title: req.body.title,
      body: req.body.message,
      username: req.user._id,
      createdAt: Date.now()
    });

    message.save(function(err){
      if(err){
        return next(err);
      }
      else{
        res.redirect('/');
      }
    });
  }
};

const authenticateUser = (user, res) => {
  if(!user){
    res.redirect('/log-in');
  }
}