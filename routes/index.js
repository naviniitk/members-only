var express = require('express');
const app = require('../app');
var router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');


/* GET home page. */
router.get('/', messageController.list);

router.get('/sign-up', userController.get_user);

router.post('/sign-up', userController.post_user);

router.get('/post/new', messageController.create_message_get);

router.post('/post/new', messageController.create_message_post);


module.exports = router;
