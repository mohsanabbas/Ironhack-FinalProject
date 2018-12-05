const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptSalt = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },


});

// Hashing the user Password
userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(bcryptSalt, (err, salt) => {
      if (err) return next(err);
      // console.log(user.password);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (userPassword, cb) {
  console.log(this.password);
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb) {
  console.log(this);
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    user.findOne({
      '_id': decode,
      'token': token,
    }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};


userSchema.set('timestamps', true);
const User = mongoose.model('User', userSchema);
module.exports = User;