const mongoose = require('mongoose')
const ThumbnailDetail = mongoose.model('ThumbnailDetail', {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Analysis'
  },
  thumbnailUrl: String,
  title: String,
  ctrPrediction: Number,
  titleScore: Number,
  thumbnailScore: Number,
  insights: String
});

module.exports = ThumbnailDetail