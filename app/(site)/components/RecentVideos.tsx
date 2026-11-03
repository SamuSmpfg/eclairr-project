'use client'

import { useEffect, useState } from 'react'
import api from '../../../eclairr/src/services/api'
import { useAuth } from './AuthContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface VideoPublished {
  _id: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  views: number
  engagementrate: number
  growthRate: number
}

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays <= 0) return 'today'
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}

function formatViews(views: number) {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`
  return `${views}`
}

const ROW_GRID = 'grid grid-cols-[104px_260px_140px_100px_100px_1fr]'

const SKELETON_ROWS = 3

const RecentVideos = () => {
  const { user } = useAuth()
  const [videos, setVideos] = useState<VideoPublished[]>([])
  const [loading, setLoading] = useState(true)

  async function getVideos() {
    if (!user) return
    setLoading(true)
    try {
      const response = await api.get(`/videosPublished?user=${user._id}`)
      if (response.data.error || !response.data.videosPublished) {
        console.error('Erro ao buscar vídeos:', response.data.message)
        setVideos([])
        return
      }
      setVideos(response.data.videosPublished)
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVideos()
  }, [user])

  return (
    <div className="mt-[16px]">
      <span
        className="
            font-medium
            text-[16px]
            tracking-[-2%]
            ml-[62px]
          "
      >
        Recent videos perfomance
      </span>

      <div
        className={`
          ${ROW_GRID}
          items-center
          text-[16px]
          text-[#848484]
          tracking-[-2%]
          ml-[52px]
          mt-[32px]
          p-[8px]
        `}
      >
        <div />
        <p>Video</p>
        <p>Published</p>
        <p>Views</p>
        <p>Engagement</p>
        <div />
      </div>

      <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
        {loading &&
          Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <div
              key={i}
              className={`
                ${ROW_GRID}
                bg-white
                items-center
                w-full
                max-w-[828px]
                h-[76px]
                ml-[50px]
                mb-[12px]
                p-[16px]
                rounded-[8px]
              `}
            >
              <Skeleton width={80} height={52} borderRadius={4} />
              <div className="pr-[16px]">
                <Skeleton width="80%" height={16} />
              </div>
              <Skeleton width={70} height={16} />
              <Skeleton width={50} height={16} />
              <Skeleton width={50} height={16} />
              <div className="flex justify-center">
                <Skeleton width={48} height={24} borderRadius={4} />
              </div>
            </div>
          ))}
      </SkeletonTheme>

      {!loading &&
        videos.map((video) => (
          <div
            key={video._id}
            className={`
            ${ROW_GRID}
            bg-white
            items-center
            w-full
            max-w-[828px]
            h-[76px]
            ml-[50px]
            mb-[12px]
            p-[16px]
            rounded-[8px]
          `}
          >
            <img
              src={video.thumbnailUrl}
              className="
              w-[80px]
              h-[52px]
              object-cover
              rounded-[4px]
            "
            />
            <p
              className="
              text-[16px]
              tracking-[-0.32px]
              pr-[16px]
            "
            >
              {video.title}
            </p>
            <p
              className="
              text-[16px]
              tracking-[-0.32px]
            "
            >
              {timeAgo(video.publishedAt)}
            </p>
            <p
              className="
              text-[16px]
              tracking-[-0.32px]
            "
            >
              {formatViews(video.views)}
            </p>
            <p
              className="
              text-[16px]
              tracking-[-0.32px]
            "
            >
              {video.engagementrate}%
            </p>
            <div
              className={`
              flex
              w-[48px]
              h-[24px]
              rounded-[4px]
              justify-center
              items-center
              px-2
              ${video.growthRate >= 0 ? 'bg-[#CDFF8380]/50' : 'bg-[#FF838380]/50'}
            `}
            >
              <span
                className={`
                text-[15.12px]
                ${video.growthRate >= 0 ? 'text-[#205249]' : 'text-[#7A2020]'}
              `}
              >
                {video.growthRate >= 0 ? '+' : ''}{video.growthRate}%
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default RecentVideos