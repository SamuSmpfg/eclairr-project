'use client'

import { useEffect, useState } from "react"
import { LuRefreshCcw } from "react-icons/lu"
import { IoIosArrowRoundDown } from "react-icons/io"
import { io, Socket } from "socket.io-client"
import EChart from "../libs/EChartHome"
import RefreshButton from "./RefreshButton"
import api from '../../../eclairr/src/services/api'
import { useAuth } from './AuthContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface VideoPublished {
  _id: string
  views: number
  engagementrate: number
  publishedAt: string
}

interface ChannelInfo {
  _id: string
  user: string
  subscribers: number
  overallScore: number
  avgViews?: number
  avgEngagement?: number
  uploadFrequency?: number
  previousSubscribers?: number
  previousAvgViews?: number
  previousAvgEngagement?: number
  previousUploadFrequency?: number
  updatedAt?: string
}

const SOCKET_URL = 'http://localhost:3001'

const ChannelData = () => {
  const { user } = useAuth()
  const [videos, setVideos] = useState<VideoPublished[]>([])
  const [channel, setChannel] = useState<ChannelInfo | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  async function getData() {
    if (!user) return
    setStatsLoading(true)
    try {
      const videosRes = await api.get(`/videosPublished?user=${user._id}`)
      setVideos(!videosRes.data.error && videosRes.data.videosPublished ? videosRes.data.videosPublished : [])

      const channelsRes = await api.get(`/channel?user=${user._id}`)
      setChannel(!channelsRes.data.error && channelsRes.data.channels?.[0] ? channelsRes.data.channels[0] : null)
    } catch (error) {
      console.error('Erro ao buscar dados do canal:', error)
      setVideos([])
      setChannel(null)
    } finally {
      setStatsLoading(false)
    }
  }

  function computeStats(list: VideoPublished[]) {
    const total = list.length
    const avgViews = total ? list.reduce((sum, v) => sum + (v.views || 0), 0) / total : 0
    const avgEngagement = total ? list.reduce((sum, v) => sum + (v.engagementrate || 0), 0) / total : 0
    const uploadFrequency = (() => {
      if (!total) return 0
      const dates = list.map(v => new Date(v.publishedAt).getTime()).sort((a, b) => a - b)
      const spanMs = dates[dates.length - 1] - dates[0]
      const spanWeeks = Math.max(spanMs / (1000 * 60 * 60 * 24 * 7), 1)
      return total / spanWeeks
    })()
    return { avgViews, avgEngagement, uploadFrequency }
  }

  async function handleRefresh() {
    if (!user || !channel) return
    try {
      const videosRes = await api.get(`/videosPublished?user=${user._id}`)
      const freshVideos: VideoPublished[] = !videosRes.data.error && videosRes.data.videosPublished ? videosRes.data.videosPublished : []
      const stats = computeStats(freshVideos)

      await api.put(`/channel/${channel._id}`, {
        avgViews: stats.avgViews,
        avgEngagement: stats.avgEngagement,
        uploadFrequency: stats.uploadFrequency
      })
    } catch (error) {
      console.error('Erro ao atualizar dados do canal:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [user])

  useEffect(() => {
    if (!user) return

    const socket: Socket = io(SOCKET_URL)

    socket.emit('joinChannel', user._id)

    socket.on('channel:update', (updatedChannel: ChannelInfo) => {
      setChannel(updatedChannel)
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  const stats = computeStats(videos)

  function formatCompact(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return `${Math.round(n)}`
  }

  function Delta({ current, previous, unit }: { current: number, previous?: number, unit: 'pct' | 'pts' | 'count' }) {
    if (previous === undefined || previous === null) return null
    const diff = current - previous
    const isUp = diff >= 0
    const bg = isUp ? 'bg-[#D9FFA0]' : 'bg-[#FFDADA]'
    const text = isUp ? 'text-[#205249]' : 'text-[#FE0000]'
    const label =
      unit === 'pct' ? `${isUp ? '+' : ''}${diff.toFixed(1)}%` :
      unit === 'pts' ? `${isUp ? '+' : ''}${diff.toFixed(1)} pts` :
      `${isUp ? '+' : ''}${diff.toFixed(1)}`

    return (
      <div
        className={`
    flex
    flex-row
    items-center
    justify-center
    ${bg}
    rounded-[8px]
    px-[8px]
    h-[24px]
    `}
      >
        <span className={`${text} font-light whitespace-nowrap tracking-tighter flex items-center`}>
          {!isUp && unit === 'pct' && <IoIosArrowRoundDown />}
          {label}
        </span>
      </div>
    )
  }

  return (
    <div className="ml-[100px]">
      <div
        className="
    flex
    flex-col
    mt-[8px]
    ml-auto
    mb-[16px]
    h-[1000px]
    w-[448px]
    overflow-hidden
    "
      >
        <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
          {statsLoading ? (
            <div className="mt-2">
              <Skeleton width={340} height={46} />
              <Skeleton width={220} height={46} />
              <div className="mt-3">
                <Skeleton width={260} height={24} />
              </div>
            </div>
          ) : (
            <>
              <h1 className="
      font-medium 
      text-[46px] 
      tracking-[-0.96px] 
      whitespace-nowrap
      max-w-[448px]
      ">
                Welcome back,
                <br/> 
                {user?.name || 'User'}!
              </h1>
              <p className="
    font-poppins
    text-[24px] 
    text-[#848484]
    font-light
    items-center
    leading-7
    tracking-tight
    ">
                Overrall channel performance
              </p>
            </>
          )}

          <div
            className="
     justify-center
     items-center     
    h-[310px]
    my-[24px]
    "
          >
            {statsLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Skeleton circle width={350} height={350} />
              </div>
            ) : (
              <span>
                <EChart value={channel?.overallScore ?? 0}>
                </EChart>
              </span>
            )}
            {!statsLoading && (
              <p className="
    flex
    font-poppins
    text-[16px] 
    text-[#848484]
    font-extralight 
    tracking-tight
    whitespace-nowrap
    justify-center
    pb-[24px]
    ">
                Based on your lastest {Math.min(videos.length, 30)} uploaded videos
              </p>
            )}
          </div>

          <div className="flex justify-center mt-[60px]">
            <RefreshButton
              onRefresh={handleRefresh}
              lastRefreshedAt={channel?.updatedAt}
              className="
    flex
    items-center
    justify-center
    bg-black
    rounded-[8px]
    pl-[16px]
    h-[56px]
    w-[244px]
    cursor-pointer
    flex-shrink-0
    hover:cursor-pointer
    hover:scale-110
    transition
    "
            >
              <span
                className="
    flex
    items-center
    justify-center
    rounded-lg
    w-8
    h-8
    "
              >
                <LuRefreshCcw
                  className="
    text-white 
    w-[24px] 
    h-[24px]
    mr-[8px]
    " />
              </span>

              <span
                className="
      items-center 
      font-extralight 
      text-white 
      justify-center
      whitespace-nowrap
      mr-[16px]
      ">
                Refresh channel data
              </span>
            </RefreshButton>
          </div>

          <div className="flex flex-row gap-x-[16px] mt-[24px]">

            <div className="flex flex-col gap-y-[16px]">

              <div
                className="
    flex
    flex-col
    w-[216px]
    h-[155px]
    bg-[#E0E0EE]
    rounded-lg
    p-[16px]
    "
              >
                <span className="
    text-[#848484]
    font-light
    ">
                  Subscribers
                </span>
                <div
                  className="
    mt-5
    flex
    flex-col
    gap-y-0
    "
                >
                  {statsLoading ? (
                    <>
                      <Skeleton width={80} height={36} />
                      <div className="mt-2">
                        <Skeleton width={100} height={14} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-x-3">
                        <span
                          className="
    text-black
    text-4xl
    font-medium
    "
                        >
                          {formatCompact(channel?.subscribers ?? 0)}
                        </span>

                        <Delta
                          current={channel?.subscribers ?? 0}
                          previous={channel?.previousSubscribers}
                          unit="pct"
                        />
                      </div>

                      <span
                        className="
    text-[#848484]
    font-light
    text-sm
    whitespace-nowrap
    tracking-tighter
    "
                      >
                        vs last 30 days
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div
                className="
    flex
    flex-col
    w-[216px]
    h-[155px]
    bg-[#E0E0EE]
    rounded-lg
    p-[16px]
    "
              >
                <span className="
    text-[#848484]
    font-light
    ">
                  Engagement
                </span>
                <div
                  className="
    mt-5
    flex
    flex-col
    "
                >
                  {statsLoading ? (
                    <>
                      <Skeleton width={80} height={36} />
                      <div className="mt-2">
                        <Skeleton width={100} height={14} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-x-2">
                        <span
                          className="
    text-black
    text-4xl
    font-medium
    "
                        >
                          {stats.avgEngagement.toFixed(1)}%
                        </span>

                        <Delta
                          current={stats.avgEngagement}
                          previous={channel?.previousAvgEngagement}
                          unit="pts"
                        />
                      </div>

                      <span
                        className="
    text-[#848484]
    font-light
    text-sm
    whitespace-nowrap
    tracking-tighter
    "
                      >
                        Avg engagement
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-[16px]">
              <div
                className="
    flex
    flex-col
    w-[216px]
    h-[155px]
    bg-[#E0E0EE]
    rounded-lg
    p-[16px]
    "
              >
                <span className="
    text-[#848484]
    font-light
    ">
                  Avg Views
                </span>
                <div
                  className="
    mt-5
    flex
    flex-col
    gap-y-0
    "
                >
                  {statsLoading ? (
                    <>
                      <Skeleton width={80} height={36} />
                      <div className="mt-2">
                        <Skeleton width={80} height={14} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-x-3">
                        <span
                          className="
    text-black
    text-4xl
    font-medium
    "
                        >
                          {formatCompact(stats.avgViews)}
                        </span>

                        <Delta
                          current={stats.avgViews}
                          previous={channel?.previousAvgViews}
                          unit="pct"
                        />
                      </div>

                      <span
                        className="
    text-[#848484]
    font-light
    text-sm
    whitespace-nowrap
    tracking-tighter
    "
                      >
                        per video
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div
                className="
    flex
    flex-col
    w-[216px]
    h-[155px]
    bg-[#E0E0EE]
    rounded-lg
    p-[16px]
    "
              >
                <span className="
    text-[#848484]
    font-light
    ">
                  Upload Frequency
                </span>
                <div
                  className="
    mt-5
    flex
    flex-col
    "
                >
                  {statsLoading ? (
                    <>
                      <Skeleton width={80} height={36} />
                      <div className="mt-2">
                        <Skeleton width={100} height={14} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-x-2">
                        <span
                          className="
    text-black
    text-4xl
    font-medium
    "
                        >
                          {stats.uploadFrequency.toFixed(1)}
                        </span>

                        <Delta
                          current={stats.uploadFrequency}
                          previous={channel?.previousUploadFrequency}
                          unit="count"
                        />
                      </div>

                      <span
                        className="
    text-[#848484]
    font-light
    text-sm
    whitespace-nowrap
    tracking-tighter
    "
                      >
                        videos/week
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      </div>
    </div>
  )
}

export default ChannelData