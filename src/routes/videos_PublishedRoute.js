const express = require('express')
const route = express.Router()

const VideosPublished = require('../models/videos_Published')

route.post('/', async (req, res) => {
  try {
    const videosPublished = await new VideosPublished(req.body).save()
    res.json({error: false, videosPublished})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.get('/', async (req, res) => {
  try {
    const filters = {}
    if (req.query.user) {
      filters.user = req.query.user
    }
    const videosPublished = await VideosPublished.find(filters)
    res.json({ error: false, videosPublished })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const videosPublished = await VideosPublished.findById(req.params.id)
    res.json({ error: false, videosPublished })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const videosPublished = await VideosPublished.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({error: false, videosPublished})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await VideosPublished.findByIdAndDelete(req.params.id)
    res.json({error: false})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

module.exports = route