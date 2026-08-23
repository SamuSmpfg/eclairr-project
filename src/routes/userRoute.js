const express = require('express')
const route = express.Router()

const User = require('../models/user')
const Channel = require('../models/channel')

route.post('/', async (req, res) => {
  try {
    const user = await new User(req.body).save()

    const channel = await new Channel({
      user: user._id,
      name: req.body.channel,
      subscribers: 0,
      videosPublished: 0,
      overallScore: 0,
      avgViews: 0,
      avgEngagement: 0,
      uploadFrequency: 0,
      lastRefreshedAt: new Date()
    }).save()

    const io = req.app.get('io')
    io.to(`channel:${user._id}`).emit('channel:update', channel)

    res.json({ error: false, user, channel })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/', async (req, res) => {
  try {
    const users = await User.find(req.body.filters)
    res.json({ error: false, users })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({ error: false, user })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({error: false, user})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({error: false})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})
module.exports = route