// app.js
const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();

passport.use(new TwitterStrategy({
  consumerKey: 'your-twitter-consumer-key',
  consumerSecret: 'your-twitter-consumer-secret',
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Handle user data from the profile object
  // For example, save user to database or create a new user
  return done(null, profile);
}));

app.get('/auth/twitter',
  passport.authenticate('twitter')
);

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the dashboard or any desired page after successful authentication
    res.redirect('/dashboard');
  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
