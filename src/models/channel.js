const mongoose = require('mongoose')

const Channel = mongoose.model('Channel', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  subscribers: Number,
  videosPublished: Number,
  overallScore: Number,
  avgViews: Number,
  avgEngagement: Number,
  uploadFrequency: Number,
  previousSubscribers: Number,
  previousAvgViews: Number,
  previousAvgEngagement: Number,
  previousUploadFrequency: Number,
  lastRefreshedAt: Date
});

module.exports = Channel