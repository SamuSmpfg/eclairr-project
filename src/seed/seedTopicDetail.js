const mongoose = require('mongoose')
const TopicDetail = require('../models/topicDetail')

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kscodinp_db_user:Samuel@cluster0.i34kdjt.mongodb.net/eclairr'

async function seed() {
  await mongoose.connect(MONGO_URI)

  const topic = 'I Tested 5 AI Tools for Youtube'

  await TopicDetail.deleteMany({ topic })

  const doc = await new TopicDetail({
    topic,
    overallScore: 78,
    competition: 37,
    personalRelevance: 68,
    potentialPerfomance: 88,
    interestLevel: 91,
    keyFactors: [],
    actionableTips: []
  }).save()

  console.log('Mock inserido:', doc)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})