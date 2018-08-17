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
  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  // ====================================
  // set the route ======================
  // ====================================
  app.get('/', function(req, res){    // <-- home page
    res.sendFile('./view/HomeScreen.html', {root: __dirname});
  });

  app.get('/profile', function(req, res){   // <-- logined page
    res.render('C:\\Users\\user\\Desktop\\gcloud\\view\\component\\profile.ejs', { user: ls.get('user') });
  });

  // login route
  app.get('/oauth', passport.authenticate('google_token', {scope : ['profile', 'email']}));

  // login successfully then callback to the route
  app.get('/oauth/callback', passport.authenticate('google_token', {successRedirect: '/profile', failureRedirect: '/'}));
}
