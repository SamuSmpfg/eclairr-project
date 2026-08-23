const mongoose = require('mongoose')
const VideosPublished = mongoose.model('VideosPublished', {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  thumbnailUrl: String,
  publishedAt: Date,
  videosPublished: Number,
  views: Number,
  engagementrate: Number,
  growthRate: Number
});

module.exports = VideosPublished