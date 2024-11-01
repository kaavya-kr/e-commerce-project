
const express = require('express');
const { check ,body} = require('express-validator')

const authController = require('../controllers/auth');
const User = require('../models/user')

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
      body('password', 'Password has to be valid.')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin
  );
router.post(
     '/signup',
    [
      check('email')
.isEmail()
.withMessage('Please enter a valid email')
.custom((value,{req}) => {
    // if(value === 'test@test.com'){
    //     throw new Error('This email address is forbidden.')
    // }
    // return true;
    return User.findOne({ email: value})
    .then(userDoc => {
      if (userDoc) {
        return Promise.reject('Email already exist, please select another one')
    }
    })
})
.normalizeEmail(),
body('password','Please enter a password only numbers and text had at least 5 characters')
.isLength({min: 6})
.isAlphanumeric()
.trim(),
body('confirmPassword')
.trim().custom((value,{req}) =>{
    if(value !== req.body.password){
        throw new Error('Password Not Match!');
    }
    return true;
})
    ],
authController.postSignup);

router.post('/logout',authController.postLogout);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);

router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);


module.exports = router;