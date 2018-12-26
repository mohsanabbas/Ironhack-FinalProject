const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send('You are not admin');
  }
  next();
};
module.exports = admin;
