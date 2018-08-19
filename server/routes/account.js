const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');


router.post('/signup', (req, res, next) => {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;
    
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (existingUser) {
        res.json({
          success: false,
          message: 'Account with that email is already exist'
        });

      } else {
        user.save();

        var token = jwt.sign({
          user: user
        }, config.secret, {
          expiresIn: '7d'
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }

     });
});

router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        
        if(!user){
            res.json({
                success: false,
                message: 'Authenticated failed, User not found'
            });
        } else if (user) {
            var validPassword = user.comparePassword(req.body.password);
            
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password'
                });
            } else {

                var token = jwt.sign({
                  user: user
                }, config.secret, {
                  expiresIn: '7d'
                });

                res.json({
                  success: true,
                  message: 'Enjoy your token',
                    token: token
                });
            }
        }
    });
});

module.exports = router;
