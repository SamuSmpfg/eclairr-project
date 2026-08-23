const express = require('express')
const route = express.Router()

const Channel = require('../models/channel')

route.post('/', async (req, res) => {
  try {
    const channel = await new Channel(req.body).save()

    const io = req.app.get('io')
    io.to(`channel:${channel.user}`).emit('channel:update', channel)

    res.json({error: false, channel})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.get('/', async (req, res) => {
  try {
    const channels = await Channel.find(req.query.user ? { user: req.query.user } : {})
    res.json({ error: false, channels })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const channels = await Channel.findById(req.params.id)
    res.json({ error: false, channels })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const current = await Channel.findById(req.params.id)
    if (!current) {
      return res.json({ error: true, message: 'Channel not found' })
    }

    const snapshot = {}
    if (req.body.subscribers !== undefined) snapshot.previousSubscribers = current.subscribers
    if (req.body.avgViews !== undefined) snapshot.previousAvgViews = current.avgViews
    if (req.body.avgEngagement !== undefined) snapshot.previousAvgEngagement = current.avgEngagement
    if (req.body.uploadFrequency !== undefined) snapshot.previousUploadFrequency = current.uploadFrequency

    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...snapshot, lastRefreshedAt: new Date() },
      { new: true }
    )

    const io = req.app.get('io')
    io.to(`channel:${channel.user}`).emit('channel:update', channel)

    res.json({error: false, channel})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await Channel.findByIdAndDelete(req.params.id)
    res.json({error: false})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})
module.exports = route