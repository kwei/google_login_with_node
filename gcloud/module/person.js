// ====================================
// user info object ===================
// ====================================
module.exports = function(userId, userToken, userName, userEmail, opt){
  this.user_id = userId,
  this.user_google_token = userToken;
  this.user_name = userName;
  this.user_email = userEmail;
  this.opt = opt;
}
