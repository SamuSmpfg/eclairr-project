const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000']
}))

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000']
  }
})

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  socket.on('joinChannel', (userId) => {
    socket.join(`channel:${userId}`)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id)
  })
})

app.set('io', io)

require('./database')
app.use('/user', require('./src/routes/userRoute'))
app.use('/channel', require('./src/routes/channelRoute'))
app.use('/videosPublished', require('./src/routes/videos_PublishedRoute'))
app.use('/analysis', require('./src/routes/analysisRoute'))
app.use('/topicDetail', require('./src/routes/topicDetailRoute'))
app.use('/hookDetail', require('./src/routes/hookDetailRoute'))
app.use('/thumbnailDetail', require('./src/routes/thumbnailDetailRoute'))

server.listen(3001, () => {
  console.log(`Testando onde o código vai`)
})