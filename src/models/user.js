const mongoose = require('mongoose')
const User = mongoose.model('User', {
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId
    }
  },
  avatar: {
    type: String
  },
  channel: {
    type: String,
    required: true
  }
});

module.exports = User