const express = require('express');
const passport = require('passport');
var ls = require('local-storage');    // <-- local storage, can be changed to your database. hint : mongoose

// ====================================
// colorful console in terminal =======
// ====================================
const {
  textStyle,
  textFg,
  textBg
} = require('./module/color.js');

var imp_passport = require('./controller/passport.js');
var Route = require('./route.js');

imp_passport(ls, passport);   // <-- implement the passport method

var app = express();
Route(app, ls, passport);     // <-- implement the routing setting

var server = app.listen(3000, function(){
  console.log(textFg.FgGreen, "\n[ Info ] ", textStyle.Reset, "Server is online!\n");
})
