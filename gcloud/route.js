const BodyParser = require('body-parser');
// ====================================
// colorful console in terminal =======
// ====================================
const {
  textStyle,
  textFg,
  textBg
} = require('./module/color.js');

module.exports = function(app, ls, passport){

  // ====================================
  // routing setting ====================
  // ====================================
  app.set('view engine','ejs');
  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  // ====================================
  // set the route ======================
  // ====================================
  app.get('/', function(req, res){    // <-- home page
    res.render('HomeScreen', { root: __dirname, google_user: ls.get('google_user'), fb_user: ls.get('fb_user') });
    ls.set('google_user', null);
    ls.set('fb_user', null);
  });

  app.get('/profile', function(req, res){   // <-- logined page
    res.render('component\\profile.ejs', { google_user: ls.get('google_user'), fb_user: ls.get('fb_user') });
  });

  // google login route
  app.get('/oauth', passport.authenticate('google_token', {scope : ['profile', 'email']}));

  // google login successfully then callback to the route
  app.get('/oauth/callback', passport.authenticate('google_token', {successRedirect: '/', failureRedirect: '/'}));

  // fb login route
  app.get('/fb', passport.authenticate('fb_token', { authType: 'rerequest', scope: ['user_friends', 'manage_pages'] }));

  // fb login successfully then callback to the route
  app.get('/fb/callback', passport.authenticate('fb_token', {successRedirect: '/', failureRedirect: '/'}));
}
