import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  server: {
    proxy: {
      '/user': { target: 'http://localhost:3001', changeOrigin: true },
      '/channel': { target: 'http://localhost:3001', changeOrigin: true },
      '/videosPublished': { target: 'http://localhost:3001', changeOrigin: true },
      '/analysis': { target: 'http://localhost:3001', changeOrigin: true },
      '/topicDetail': { target: 'http://localhost:3001', changeOrigin: true },
      '/hookDetail': { target: 'http://localhost:3001', changeOrigin: true },
      '/thumbnailDetail': { target: 'http://localhost:3001', changeOrigin: true },
      '/auth': { target: 'http://localhost:3001', changeOrigin: true },
    }
  }
})