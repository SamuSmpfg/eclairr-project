const express = require('express')
const route = express.Router()

const HookDetail = require('../models/hookDetail')

route.post('/', async (req, res) => {
  try {
    const hookDetail = await new HookDetail(req.body).save()
    res.json({ error: false, hookDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/', async (req, res) => {
  try {
    const filters = {}
    if (req.query.hookText) filters.hookText = req.query.hookText
    if (req.query.user) filters.user = req.query.user

    const hookDetail = await HookDetail.find(filters)
    res.json({ error: false, hookDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.get('/:id', async (req, res) => {
  try {
    const hookDetail = await HookDetail.findById(req.params.id)
    res.json({ error: false, hookDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.put('/:id', async (req, res) => {
  try {
    const hookDetail = await HookDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json({ error: false, hookDetail })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await HookDetail.findByIdAndDelete(req.params.id)
    res.json({ error: false })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

module.exports = route