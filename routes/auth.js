const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
 // to see profile details: console.log(profile)
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user)
            }

        } catch (error) {
            console.log(error);
        }
    }
));


// This is the route for Google login
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

// and this does retrieving data
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard'
    })
);

// if anything went wrong, this would be the route:
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong!')
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
            res.send('Error loggin out');
        } else {
            res.redirect('/')
        }
    })
});

// this is to presist user data once auth is successful
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// Retrieve user data from session
passport.deserializeUser(async function (id, cb) {
   cb(null, await User.findById(id))
});


module.exports = router;