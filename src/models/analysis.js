const mongoose = require('mongoose')
const Analysis = mongoose.model('Analysis', {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Channel'
  },
  type: String,
  inputText: String,
  thumbnailUrl: String,
  score: Number,
  scoreLabel: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = Analysis