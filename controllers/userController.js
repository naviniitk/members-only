const async = require('async');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcryptjs');

exports.get_user = function(req, res, next) {
  res.render('sign-up');
};

exports.post_user = [body('username', 'Username is required').trim().isLength({min:1}).escape(), body('password', 'Password is required').trim().isLength({min:1}).escape(), body('confirm_password', 'Confirm Password must be the same as Password').custom((value, {req}) => value === req.body.password), (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.render('index', {user: req.body, errors: errors.array()});
  }

  else{
    bcrypt.hash(req.body.password, 10, (err, hashedpwd) => {
      if(err){
        return next(err);
      }
      var user = new User({
        username: req.body.username,
        password: hashedpwd,
        member: false
      });
      user.save(function(err){
        if(err){
          return next(err);
        }
        res.redirect('/');
      });
    });
  }
}]