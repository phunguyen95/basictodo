const express = require('express');
const router = express.Router();
//load user model
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretKey;
const passport = require('passport');
//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json( errors );
    } else {
     
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ user }))
            .catch(err => res.json(err));
        });
      });
    }
  });
});
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //assign token
        const payload = { id: user._id, name: user.name };
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          return res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password is incorrect';
        return res.status(400).json( errors );
      }
    });
  });
});


module.exports = router;
