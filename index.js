const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const CONFIG = require('./config')
const google = require('googleapis').google
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const OAuth2 = google.auth.OAuth2

const User = require('./src/models/user')
const Channel = require('./src/models/channel')
const VideosPublished = require('./src/models/videos_Published')

const oauth2client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
)

const loginLink = oauth2client.generateAuthUrl({
  access_type: 'offline',
  scope: CONFIG.oauth2Credentials.scopes,
  prompt: 'select_account'
})

app.get('/oauth2callback', async function (req, res) {
  const oauth2client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  )

  if (req.query.error) {
    return res.redirect('http://localhost:3000/')
  }

  try {
    const { tokens } = await oauth2client.getToken(req.query.code)
    oauth2client.setCredentials(tokens)

    const oauth2Api = google.oauth2({ version: 'v2', auth: oauth2client })
    const { data: profile } = await oauth2Api.userinfo.get()

    const youtube = google.youtube({ version: 'v3', auth: oauth2client })
    const { data: channelRes } = await youtube.channels.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      mine: true
    })
    const channelInfo = channelRes.items && channelRes.items[0]

    console.log('statistics:', channelInfo?.statistics)

    const channelName = channelInfo?.snippet?.title || profile.name
    const subscribers = channelInfo ? Number(channelInfo.statistics.subscriberCount) : 0
    const videosPublished = channelInfo ? Number(channelInfo.statistics.videoCount) : 0
    const totalViews = channelInfo ? Number(channelInfo.statistics.viewCount) : 0

    let user = await User.findOne({ googleId: profile.id })
    if (user) {
      user.name = profile.name
      user.email = profile.email
      user.avatar = profile.picture
      user.channel = channelName
      await user.save()
    } else {
      user = await new User({
        googleId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        channel: channelName
      }).save()
    }

    const uploadsPlaylistId = channelInfo?.contentDetails?.relatedPlaylists?.uploads

    console.log('uploadsPlaylistId:', uploadsPlaylistId)

    if (uploadsPlaylistId) {
      const { data: playlistRes } = await youtube.playlistItems.list({
        part: ['snippet', 'contentDetails'],
        playlistId: uploadsPlaylistId,
        maxResults: 25
      })

      const videoIds = playlistRes.items.map(item => item.contentDetails.videoId)

      const statsByVideoId = {}

      if (videoIds.length > 0) {
        const { data: videosStatsRes } = await youtube.videos.list({
          part: ['statistics'],
          id: videoIds
        })

        videosStatsRes.items.forEach(v => {
          statsByVideoId[v.id] = v.statistics
        })
      }

      for (const item of playlistRes.items) {
        const videoId = item.contentDetails.videoId
        const stats = statsByVideoId[videoId] || {}

        console.log(`Vídeos salvos: ${playlistRes.items.length}`)

        await VideosPublished.findOneAndUpdate(
          { user: user._id, videoId },
          {
            user: user._id,
            videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
            publishedAt: item.snippet.publishedAt,
            views: Number(stats.viewCount) || 0
          },
          { upsert: true, new: true }
        )
      }
    }

    let channel = await Channel.findOne({ user: user._id })
    if (channel) {
      channel.name = channelName
      channel.subscribers = subscribers
      channel.videosPublished = videosPublished
      channel.totalViews = totalViews
      channel.lastRefreshedAt = new Date()
      await channel.save()
    } else {
      channel = await new Channel({
        user: user._id,
        name: channelName,
        subscribers,
        videosPublished,
        totalViews,
        overallScore: 0,
        avgViews: 0,
        avgEngagement: 0,
        uploadFrequency: 0,
        lastRefreshedAt: new Date()
      }).save()
    }

    const io = req.app.get('io')
    io.to(`channel:${user._id}`).emit('channel:update', channel)

    res.cookie('jwt', jwt.sign(tokens, CONFIG.JWTsecret))
    return res.redirect(`http://localhost:3000/?userId=${user._id}`)
  } catch (err) {
    console.error('Erro no fluxo de OAuth:', err)
    return res.redirect('http://localhost:3000/')
  }
})

app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', __dirname)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000']
}))

app.get('/', (req, res) => {
  return res.json({ status: 'Backend rodando', message: 'Acesse o frontend em http://localhost:5173' });
});

app.get('/auth/login-link', (req, res) => {
  res.json({ loginLink })
})

app.get('/test-gemini', async (req, res) => {
  try {
    const response = await aiModel.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'What is node.js?'
    })
    res.json({ text: response.text })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

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