const express = require('express')
const route = express.Router()

const ThumbnailDetail = require('../models/thumbnailDetail')

route.post('/', async (req, res) => {
  try {
    const thumbnailDetail = await new ThumbnailDetail(req.body).save()
    res.json({ error: false, thumbnailDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/', async (req, res) => {
  try {
    const filters = {}
    if (req.query.title) filters.title = req.query.title
    if (req.query.user) filters.user = req.query.user

    const thumbnailDetail = await ThumbnailDetail.find(filters)
    res.json({ error: false, thumbnailDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const thumbnailDetail = await ThumbnailDetail.findById(req.params.id)
    res.json({ error: false, thumbnailDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const thumbnailDetail = await ThumbnailDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({ error: false, thumbnailDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await ThumbnailDetail.findByIdAndDelete(req.params.id)
    res.json({ error: false })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

module.exports = route