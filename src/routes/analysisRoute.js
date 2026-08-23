const express = require('express')
const route = express.Router()

const Analysis = require('../models/analysis')

route.post('/', async (req, res) => {
  try {
    const analysis = await new Analysis(req.body).save()
    res.json({error: false, analysis})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.get('/', async (req, res) => {
  try {
    const analysis = await Analysis.find(req.body.filters)
    res.json({ error: false, analysis })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/latest', async (req, res) => {
  try {
    const { user, type } = req.query
    const filters = {}
    if (user) filters.user = user
    if (type) filters.type = type

    const analysis = await Analysis
      .findOne(filters)
      .sort({ createdAt: -1 })

    res.json({ error: false, analysis: analysis || null })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id)
    res.json({ error: false, analysis })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const analysis = await Analysis.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({error: false, analysis})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await Analysis.findByIdAndDelete(req.params.id)
    res.json({error: false})
  } catch (error) {
    res.json({error: true, message: error.message})
  }
})

module.exports = route