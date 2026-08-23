const express = require('express')
const route = express.Router()

const TopicDetail = require('../models/topicDetail')

route.post('/', async (req, res) => {
  try {
    const topicDetail = await new TopicDetail(req.body).save()
    res.json({ error: false, topicDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/', async (req, res) => {
  try {
    const filters = {}
    if (req.query.topic) filters.topic = req.query.topic

    const topicDetail = await TopicDetail.find(filters)
    res.json({ error: false, topicDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const topicDetail = await TopicDetail.findById(req.params.id)
    res.json({ error: false, topicDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const topicDetail = await TopicDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({ error: false, topicDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await TopicDetail.findByIdAndDelete(req.params.id)
    res.json({ error: false })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

module.exports = route