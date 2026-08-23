'use client'

import { useEffect, useState } from "react"
import { LuClapperboard, LuCompass } from "react-icons/lu"
import Button from "./Button"
import { GoArrowUpRight } from "react-icons/go"
import { PiMagicWand } from "react-icons/pi"
import api from "../../../eclairr/src/services/api"
import { useAuth } from "./AuthContext"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface LatestAnalysis {
  inputText: string
  thumbnailUrl?: string
}

const Workflow = () => {
  const { user } = useAuth()
  const [topicLatest, setTopicLatest] = useState<LatestAnalysis | null>(null)
  const [hookLatest, setHookLatest] = useState<LatestAnalysis | null>(null)
  const [thumbLatest, setThumbLatest] = useState<LatestAnalysis | null>(null)

  const [topicLoading, setTopicLoading] = useState(true)
  const [hookLoading, setHookLoading] = useState(true)
  const [thumbLoading, setThumbLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    api.get('/analysis/latest', { params: { user: user._id, type: 'hilc-topic-tool' } })
      .then(res => setTopicLatest(res.data?.analysis ?? null))
      .catch(() => setTopicLatest(null))
      .finally(() => setTopicLoading(false))

    api.get('/analysis/latest', { params: { user: user._id, type: 'hook-scorer' } })
      .then(res => setHookLatest(res.data?.analysis ?? null))
      .catch(() => setHookLatest(null))
      .finally(() => setHookLoading(false))

    api.get('/analysis/latest', { params: { user: user._id, type: 'title-thumbnail-predictor' } })
      .then(res => setThumbLatest(res.data?.analysis ?? null))
      .catch(() => setThumbLatest(null))
      .finally(() => setThumbLoading(false))
  }, [user])

  return (
    <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
      <span className="font-semibold mb-[16px] ml-[135px]">
        Pre-publish workflow
      </span>
      <div className="flex flex-col w-full items-center ml-[35px]">
        <div className="flex flex-row gap-[16px]">

          {/* HILC Topic Tool */}
          <div className="flex flex-col">
            <div 
            className="
            flex 
            flex-col 
            bg-white 
            shadow-lg 
            rounded-[12px] 
            p-[16px] 
            w-[265.3333435058594px] 
            h-[299px] 
            overflow-hidden">
              <span className="tracking-[-0.72px] font-medium text-[24px]">
                HILC Topic Tool
              </span>
              <p 
              className="
              mt-[12px] 
              mb-[32px] 
              tracking-[-0.28px] 
              text-[#848484] 
              text-[14px]">
                Discover high-potential video topics before you start creating.
              </p>
              <p 
              className="
              mb-[12px] 
              tracking-[-0.32px] 
              text-[#848484] 
              text-[16px]">
                Last scored topic
              </p>
              <div className="flex flex-row items-start mb-[24px]">
                {topicLoading ? (
                  <div className="flex flex-row items-start w-full">
                    <Skeleton width={54} height={36} borderRadius={2.571} />
                    <div className="flex-1 min-w-0 ml-[8px]">
                      <Skeleton width="90%" height={14} />
                      <Skeleton width="60%" height={14} />
                    </div>
                  </div>
                ) : topicLatest ? (
                  <>
                    {topicLatest.thumbnailUrl && (
                      <img
                        src={topicLatest.thumbnailUrl}
                        className="rounded-[2.571px] w-[54px] h-[36px] object-cover object-center flex-shrink-0 mr-[8px]"
                      />
                    )}
                    <span className="flex-1 min-w-0 text-[14px] tracking-[-0.26px] font-medium line-clamp-2 overflow-hidden">
                      {topicLatest.inputText}
                    </span>
                  </>
                ) : (
                  <span 
                  className="
                  flex-1
                  min-w-0
                  text-[14px] 
                  tracking-[-0.26px] 
                  font-medium 
                  text-[#848484]
                  line-clamp-2
                  overflow-hidden">
                    No Analysis Available
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center">
                <Button
                  onClick={() => { }}
                  href="/search"
                  className="
                  flex bg-[#D9FFA0] 
                  rounded-[63px] 
                  h-[44px] 
                  w-[189.33334350585938px] 
                  cursor-pointer 
                  flex-shrink-0 
                  hover:cursor-pointer 
                  hover:scale-110 
                  transition"
                >
                  <div 
                  className="
                  flex 
                  flex-row 
                  items-center 
                  justify-center 
                  whitespace-nowrap 
                  pl-[24px]">
                    <LuCompass 
                    className="
                    w-[24px] 
                    h-[24px] 
                    mr-[8px] 
                    items-center 
                    justify-center" />
                    <p className="text-[16px] font-semibold tracking-[-0.16px]">
                      Check Topic
                    </p>
                  </div>
                </Button>
                <div 
                className="
                flex 
                flex-row 
                items-center 
                justify-center 
                whitespace-nowrap">
                  <Button
                    onClick={() => { }}
                    href="/search"
                    className="flex bg-[#D9FFA0] rounded-[63px] h-[44px] w-[44px] justify-center items-center cursor-pointer flex-shrink-0 hover:cursor-pointer hover:scale-110 transition"
                  >
                    <GoArrowUpRight className="w-[24px] h-[24px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hook Scorer */}
          <div className="flex flex-col bg-white shadow-lg rounded-[12px] p-[16px] w-[265.3333435058594px] h-[299px] overflow-hidden">
            <span className="tracking-[-0.72px] font-medium text-[24px]">
              Hook Scorer
            </span>
            <p className="mt-[12px] mb-[32px] tracking-[-0.28px] text-[#848484] text-[14px]">
              Score your first 30–60 seconds to maximize retention.
            </p>
            <p className="mb-[12px] tracking-[-0.32px] text-[#848484] text-[16px]">
              Last scored hook
            </p>
            <div className="flex flex-row items-start mb-[24px]">
              {hookLoading ? (
                <div className="flex flex-row items-start w-full">
                  <Skeleton width={54} height={36} borderRadius={2.571} />
                  <div className="flex-1 min-w-0 ml-[8px]">
                    <Skeleton width="90%" height={14} />
                    <Skeleton width="60%" height={14} />
                  </div>
                </div>
              ) : hookLatest ? (
                <>
                  {hookLatest.thumbnailUrl && (
                    <img
                      src={hookLatest.thumbnailUrl}
                      className="rounded-[2.571px] w-[54px] h-[36px] object-cover object-center flex-shrink-0 mr-[8px]"
                    />
                  )}
                  <span className="flex-1 min-w-0 text-[14px] tracking-[-0.26px] font-medium line-clamp-2 overflow-hidden">
                    {hookLatest.inputText}
                  </span>
                </>
              ) : (
                <span className="flex-1 min-w-0 text-[14px] tracking-[-0.26px] font-medium text-[#848484] line-clamp-2 overflow-hidden">
                  No Analysis Available
                </span>
              )}
            </div>
            <div className="flex flex-row items-center">
              <Button
                onClick={() => { }}
                href="/scorerSearch"
                className="flex bg-[#FFA474] rounded-[63px] h-[44px] w-[189.33334350585938px] flex-shrink-0 hover:cursor-pointer hover:scale-110 transition"
              >
                <div className="flex flex-row items-center justify-center whitespace-nowrap pl-[24px]">
                  <LuClapperboard className="w-[24px] h-[24px] items-center justify-center" />
                  <p className="text-[16px] font-semibold tracking-[-0.16px] pl-[8px]">
                    Score Hook
                  </p>
                </div>
              </Button>
              <div className="flex flex-row items-center justify-center whitespace-nowrap">
                <Button
                  onClick={() => { }}
                  href="/scorerSearch"
                  className="flex bg-[#FFA474] rounded-[63px] h-[44px] w-[44px] justify-center items-center flex-shrink-0 hover:cursor-pointer hover:scale-110 transition"
                >
                  <GoArrowUpRight className="w-[24px] h-[24px]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnail Predictor */}
          <div className="flex flex-col">
            <div className="flex flex-col bg-white shadow-lg rounded-[12px] p-[16px] w-[265.3333435058594px] h-[299px] overflow-hidden">
              <span className="tracking-[-0.72px] font-medium text-[24px]">
                Thumbnail Predictor
              </span>
              <p className="mt-[12px] mb-[32px] tracking-[-0.28px] text-[#848484] text-[14px]">
                Predict how clickable your title and thumbnail will be.
              </p>
              <p className="mb-[12px] tracking-[-0.32px] text-[#848484] text-[16px]">
                Last prediction
              </p>
              <div className="flex flex-row items-start mb-[24px]">
                {thumbLoading ? (
                  <div className="flex flex-row items-start w-full">
                    <Skeleton width={54} height={36} borderRadius={2.571} />
                    <div className="flex-1 min-w-0 ml-[8px]">
                      <Skeleton width="90%" height={14} />
                      <Skeleton width="60%" height={14} />
                    </div>
                  </div>
                ) : thumbLatest ? (
                  <>
                    {thumbLatest.thumbnailUrl && (
                      <img
                        src={thumbLatest.thumbnailUrl}
                        className="rounded-[2.571px] w-[54px] h-[36px] object-cover object-center flex-shrink-0 mr-[8px]"
                      />
                    )}
                    <span className="flex-1 min-w-0 text-[14px] tracking-[-0.26px] font-medium line-clamp-2 overflow-hidden">
                      {thumbLatest.inputText}
                    </span>
                  </>
                ) : (
                  <span className="flex-1 min-w-0 text-[14px] tracking-[-0.26px] font-medium text-[#848484] line-clamp-2 overflow-hidden">
                    No Analysis Available
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center">
                <Button
                  onClick={() => { }}
                  href="/predictSearch"
                  className="flex bg-[#205249] rounded-[63px] h-[44px] w-[189.33334350585938px] flex-shrink-0 hover:cursor-pointer hover:scale-110 transition"
                >
                  <div className="flex flex-row items-center justify-center whitespace-nowrap pl-[24px]">
                    <PiMagicWand className="w-[24px] h-[24px] mr-[8px] text-white items-center justify-center" />
                    <p className="text-[16px] text-white font-semibold tracking-[-0.16px]">
                      Predict CTR
                    </p>
                  </div>
                </Button>
                <div className="flex flex-row items-center justify-center whitespace-nowrap">
                  <Button
                    onClick={() => { }}
                    href="/predictSearch"
                    className="flex bg-[#205249] rounded-[63px] h-[44px] w-[44px] justify-center items-center flex-shrink-0 hover:cursor-pointer hover:scale-110 transition"
                  >
                    <GoArrowUpRight className="text-white w-[24px] h-[24px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SkeletonTheme>
  )
}

export default Workflow