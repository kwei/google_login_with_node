const GoogleStrategy = require('passport-google-oauth2').Strategy;        // <-- you can use any other auth strategy
const FacebookStrategy = require('passport-facebook').Strategy;
var Person = require('../module/person.js');
// ====================================
// colorful console in terminal =======
// ====================================
const {
  textStyle,
  textFg,
  textBg
} = require('../module/color.js');

module.exports = function(ls, passport){

  // ====================================
  // initialize passport ================
  // ====================================
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // ====================================
  // set a GoogleStrategy ===============
  // ====================================
  passport.use('google_token', new GoogleStrategy({
    clientID:'1053286990123-jephsle832re26ds58n5mqhqviq2v70b.apps.googleusercontent.com',   // <-- change it to your clientID
    clientSecret:'do_MUh5X7F0oRfqIKXnqJ6t3',                                                // <-- change it to your clientSecret
    callbackURL:'http://localhost:3000/oauth/callback'                                      // <-- change it to your callbackURL
  }, async(accessToken, refreshToken, profile, done) => {
    console.log(textFg.FgGreen, '\n[ accessToken ] : \n', textStyle.Reset, accessToken);
    console.log(textFg.FgGreen, '\n[ user id ] : ', textStyle.Reset, profile.id);
    console.log(textFg.FgGreen, '\n[ user name ] : ', textStyle.Reset, profile.displayName);
    console.log(textFg.FgGreen, '\n[ user email ] : ', textStyle.Reset, profile.emails[0].value);
    console.log('');
    var user_id = profile.id;
    var user_name = profile.displayName;
    var user_email = profile.emails[0].value;
    var user = new Person(user_id, accessToken, user_name, user_email);   // <-- form an object
    ls.set('google_user', user);   // <-- set the user info to the local storage
    return done(null, user);
  }));

  // ====================================
  // set a FacebookStrategy =============
  // ====================================
  passport.use('fb_token', new FacebookStrategy({
    clientID:'717021385300886',   // <-- change it to your clientID
    clientSecret:'eb858e0207c491d435aad8932fae4caf',                                                // <-- change it to your clientSecret
    callbackURL:'http://localhost:3000/fb/callback',                                      // <-- change it to your callbackURL
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, async(accessToken, refreshToken, profile, done) => {
    console.log(textFg.FgGreen, '\n[ accessToken ] : \n', textStyle.Reset, accessToken);
    console.log(textFg.FgGreen, '\n[ user id ] : ', textStyle.Reset, profile.id);
    console.log(textFg.FgGreen, '\n[ user name ] : ', textStyle.Reset, profile.displayName);
    console.log(textFg.FgGreen, '\n[ user photo ] : ', textStyle.Reset, profile.photos[0].value);
    console.log('');
    var user_id = profile.id;
    var user_name = profile.displayName;
    var user = new Person(user_id, accessToken, user_name);   // <-- form an object
    ls.set('fb_user', user);   // <-- set the user info to the local storage
    return done(null, user);
  }));
}
