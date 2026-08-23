const mongoose = require('mongoose')
const TopicDetail = mongoose.model('TopicDetail', {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Analysis'
  },
  topic: {
    type: String,
    required: true
  },
  thumbnailUrl: String,
  overallScore: Number,
  competition: Number,
  personalRelevance: Number,
  potentialPerfomance: Number,
  interestLevel: Number,
  keyFactors: Array,
  actionableTips: Array
});

module.exports = TopicDetail