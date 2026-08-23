const mongoose = require('mongoose')

const RewriteSuggestionSchema = new mongoose.Schema({
  text: String,
  score: Number
}, { _id: false })

const HookDetail = mongoose.model('HookDetail', {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  hookText: String,
  thumbnailUrl: String,
  hookScore: Number,
  emotionalPull: Number,
  retentionPotential: Number,
  curiosity: Number,
  clarity: Number,
  rewriteSuggestions: [RewriteSuggestionSchema]
});

module.exports = HookDetail