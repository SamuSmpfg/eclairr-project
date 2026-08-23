'use client'

import { useEffect, useState } from "react"
import { HiOutlineArrowUpRight } from "react-icons/hi2"
import Sidebar from "../../components/sidebar/Sidebar"
import HilcChart from "../../libs/HilcChart"
import Header from "../components/Header"
import Button from "../../components/Button"
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import { LuRefreshCcw, LuClapperboard } from "react-icons/lu"
import { TbBomb } from "react-icons/tb"
import { PiCrownSimpleLight, PiMagicWand } from "react-icons/pi"
import api from "../../../../eclairr/src/services/api"
import { useAuth } from "../../components/AuthContext"
import { getGaugeScoreStyle, getColumnStyle, sortByScoreAsc, getAverageScore, getOverallStyle } from "../../libs/scoreUtils"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface PageProps {
  params: { topic: string }
}

interface TopicDetailData {
  thumbnailUrl: string
  overallScore: number
  competition: number
  personalRelevance: number
  potentialPerfomance: number
  interestLevel: number
}

export default function AnalizedPage({ params }: PageProps) {
  const topic = decodeURIComponent(params.topic)
  const [data, setData] = useState<TopicDetailData | null>(null)
  const [saved, setSaved] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    api.get('/topicdetail', { params: { topic } })
      .then((res) => {
        const found = res.data?.topicDetail?.[0]
        if (found) setData(found)
      })
      .catch((err) => console.error('Erro ao buscar topicDetail:', err))
  }, [topic])

  if (!data) {
    return (
      <div className="w-full px-[32px] overflow-y-auto">
        <Header />
        <div className="flex flex-row flex-grow mb-[24px]">
          <Sidebar />
          <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
            <div>
              <div
                className="
                  flex
                  flex-row
                  justify-between
                  w-full
                  px-[42px]
                "
              >
                {/* Coluna 1 - Título, Gauge, Ranks box */}
                <div
                  className="
                flex
                flex-col
                items-center
                w-[399px]
                h-[698px]
                mt-[42px]
              "
                >
                  <div className="w-full">
                    <Skeleton width={340} height={32} />
                    <Skeleton width={220} height={32} />
                  </div>

                  <div className="flex items-center justify-center my-[24px]">
                    <Skeleton circle width={260} height={260} />
                  </div>

                  <div
                    className="
                  bg-white
                  rounded-[12px]
                  w-[399px]
                  h-[230px]
                  p-[16px]
                "
                  >
                    <div
                      className="
                    flex
                    flex-row
                    items-center
                    border
                    border-[#E0E0EE]
                    w-[367px]
                    h-[52px]
                    rounded-[4px]
                    p-[8px]
                  "
                    >
                      <Skeleton width={44} height={44} borderRadius={3} />
                      <div className="pl-[8px] w-full">
                        <Skeleton width={260} height={16} />
                      </div>
                    </div>
                    <div className="py-[16px]">
                      <Skeleton count={3} height={12} />
                    </div>
                    <div
                      className="
                    flex
                    flex-row
                    justify-between
                    gap-[8px]
                  "
                    >
                      <Skeleton width={192} height={48} borderRadius={8} />
                      <Skeleton width={192} height={48} borderRadius={8} />
                    </div>
                  </div>
                </div>

                {/* Coluna 2 - Key Factors, Actionable Tips */}
                <div
                  className="
                flex
                flex-col
                items-center
                mt-[42px]
              "
                >
                  <div
                    className="
                  bg-white
                  w-[410px]
                  h-[360px]
                  rounded-[12px]
                  p-[16px]
                "
                  >
                    <Skeleton width={140} height={24} />
                    <div className="mt-[24px] flex flex-col gap-y-[16px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton width={44} height={44} borderRadius={8} />
                          <div className="flex-1">
                            <Skeleton width={260} height={14} />
                            <div className="mt-[4px]">
                              <Skeleton width={180} height={10} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="
                  flex
                  flex-col
                  bg-white
                  p-[16px]
                  w-[410px]
                  h-[282px]
                  rounded-[12px]
                  mt-10
                "
                  >
                    <Skeleton width={160} height={24} />
                    <div className="mt-[16px] flex flex-col gap-y-[12px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton width={44} height={44} borderRadius={3} />
                          <Skeleton width={220} height={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna 3 - Score Breakdown */}
                <div
                  className="
                    flex
                    flex-row
                    mt-[42px]
                    "
                >
                  <div
                    className="
                    p-[16px]
                    w-[600px]
                    h-[692px]
                    bg-white
                    rounded-[12px]
                    "
                  >
                    <div className="flex flex-row items-center gap-x-[12px]">
                      <Skeleton width={160} height={24} />
                      <Skeleton width={70} height={22} borderRadius={4} />
                    </div>

                    <div
                      className="
                    flex
                    flex-row
                    items-end
                    w-[500px]
                    h-[280px]
                    gap-x-[16px]
                    pl-[50px]
                    mt-[24px]
                    "
                    >
                      {[220, 180, 240, 160].map((h, i) => (
                        <div key={i} className="flex flex-col items-center w-[100px] gap-y-[8px]">
                          <Skeleton width={40} height={20} />
                          <Skeleton width={100} height={h} borderRadius={12} />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-y-[16px] mt-[16px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-row items-center gap-x-[12px]">
                          <Skeleton width={90} height={48} />
                          <Skeleton width={90} height={24} borderRadius={4} />
                          <Skeleton width={140} height={18} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner de veredito */}
              <div
                className="
                flex
                flex-row
                items-center
                border
                border-[#daedd9]
                  bg-[#ecf7ec]
                  w-[1530px]
                  h-[180px]
                  rounded-[20px]
                  mt-[42px]
                  ml-[42px]
                  px-[32px]
                "
              >
                <Skeleton circle width={64} height={64} />
                <div className="pl-[24px] flex-1">
                  <Skeleton width={80} height={18} />
                  <div className="mt-[12px]">
                    <Skeleton width={420} height={28} />
                  </div>
                  <div className="mt-[12px]">
                    <Skeleton width={520} height={14} />
                  </div>
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </div>
      </div>
    )
  }


  
  const metrics = sortByScoreAsc([
    { label: 'Competition', score: data.competition },
    { label: 'Personal Relevance', score: data.personalRelevance },
    { label: 'Potential Perfomance', score: data.potentialPerfomance },
    { label: 'Interest Level', score: data.interestLevel }
  ])

  const average = getAverageScore([
    data.competition,
    data.personalRelevance,
    data.potentialPerfomance,
    data.interestLevel
  ])
  const overall = getOverallStyle(average)

  const handleSaveAnalysis = async () => {
    if (saved) return
  
    try {
      await api.post('/analysis', {
        user: user?._id,
        type: 'hilc-topic-tool',
        inputText: topic,
        thumbnailUrl: data.thumbnailUrl,
        score: Math.round(average),
        createdAt: new Date()
      })
      setSaved(true)
    } catch (err) {
      console.error('Erro ao salvar análise:', err)
    }
  }

  return (
    <div className="w-full px-[32px] overflow-y-auto">
      <Header />
      <div className="flex flex-row flex-grow mb-[24px]">
        <Sidebar />
        <div>
          <div
            className="
              flex
              flex-row
              justify-between
              w-full
              px-[42px]
            "
          >
            <div
              className="
            flex
            flex-col
            items-center
            w-[399px]
            h-[698px]
            mt-[42px]
          "
            >
              <h2 className="
            text-[32px]
            font-medium
            tracking-[-2%]
          ">
                {topic}
              </h2>
              <HilcChart score={data.overallScore} />
              <div
                className="
              bg-white
              rounded-[12px]
              w-[399px]
              h-[230px]
              p-[16px]
            "
              >
                <div
                  className="
              flex
              flex-row
              border
              border-[#E0E0EE]
              w-[367px]
              h-[52px]
              rounded-[4px]
            "
                >
                  <div
                    className="
                  flex
                  flex-row
                  bg-[#fde3d9]
                  w-[44px]
                  h-[44px]
                  rounded-[3px]
                  text-[#FE6022]
                  items-center
                  justify-center
                  m-[2px]
                  "
                  >
                    <HiOutlineArrowUpRight
                      className="
                      w-[28px]
                      h-[28px]
                    "
                    />
                  </div>
                  <p
                    className="
                flex
                flex-row
                text-[15px]
                font-medium
                items-center
                pl-[8px]
                "
                  >
                    Ranks in the top 18% of similar topics
                  </p>
                </div>
                <p
                  className="
                text-[14px]
                text-[#838B8E]
                py-[16px]
                font-medium
              "
                >
                  This score predicts how well your topic is likely to perform
                  based on audience interest, competition, search demand,
                  and historical performance patterns.
                </p>
                <div
                  className="
                flex
                flex-row
                justify-between
                gap-[8px]
              "
                >
                  <Button
                    onClick={handleSaveAnalysis}
                    className="
                flex
                flex-row
                bg-black
                text-white
                text-[16px]
                font-medium
                rounded-[8px]
                w-[192px]
                h-[48px]
                p-[16px]
                items-center
                hover:cursor-pointer
                hover:scale-110
                transition
              "
                  >
                    {saved ? (
                      <FaBookmark
                        className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                  "
                      />
                    ) : (
                      <FaRegBookmark
                        className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                  "
                      />
                    )}
                    <span
                      className="
                  pl-[8px]
                  whitespace-nowrap
                "
                    >
                      {saved ? 'Saved!' : 'Save Analysis'}
                    </span>
                  </Button>
                  <Button
                    onClick={() => { }}
                    href="/search"
                    className="
                flex
                flex-row
                border
                border-[#D5D3E1]
                text-[#848484]
                text-[16px]
                font-medium
                rounded-[8px]
                p-[16px]
                w-[192px]
                h-[48px]
                items-center
                hover:cursor-pointer
                hover:scale-110
                transition
              "
                  >
                    <LuRefreshCcw
                      className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                  "
                    />
                    <span
                      className="
                  pl-[8px]
                  whitespace-nowrap
                "
                    >
                      Try another Topic
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="
              flex
              flex-col
              items-center
              mt-[42px]
              "
            >
              <div
                className="
              bg-white
              w-[410px]
              h-[360px]
              rounded-[12px]
              p-[16px]
              "
              >
                <span
                  className="
                text-[20px]
                font-medium
                "
                >
                  Key Factors
                </span>
                <div>
                  <div>
                    <div
                      className="
                flex
                flex-row
                  w-[378px]
                  h-[44px]
                "
                    >

                      <div
                        className="
                  flex
                  flex-row
                  bg-[#e6ffc1]
                  w-[44px]
                  h-[44px]
                  rounded-[8px]
                  text-[#364B20]
                  items-center
                  justify-center
                  mt-[32px]
                  "
                      >
                        <HiOutlineArrowUpRight
                          className="
                      w-[24px]
                      h-[24px]
                    "
                        />

                      </div>
                      <span
                        className="
                    text-[16px]
                    font-medium
                    flex
                    pt-[32px]
                    pl-[8px]
                  "
                      >
                        Search demand is high and growing
                      </span>
                    </div>
                    <p
                      className="
                    text-[12px]
                    font-medium
                    text-[#848484]
                    pl-[52px]
                    pt-[10px]
                  "
                    >
                      +28% in the last 30 days
                    </p>
                  </div>
                  <div>
                    <div
                      className="
                flex
                flex-row
                  w-[378px]
                  h-[44px]
                "
                    >
                      <div
                        className="
                  flex
                  flex-row
                  bg-[#e6ffc1]
                  w-[44px]
                  h-[44px]
                  rounded-[8px]
                  text-[#364B20]
                  items-center
                  justify-center
                  m-[2px]
                  mt-[32px]
                  "
                      >
                        <TbBomb
                          className="
                      w-[24px]
                      h-[24px]
                    "
                        />

                      </div>
                      <span
                        className="
                    text-[16px]
                    font-medium
                    flex
                    pt-[32px]
                    pl-[8px]
                  "
                      >
                        Audience engagement potential is strong
                      </span>
                    </div>
                    <p
                      className="
                    text-[12px]
                    font-medium
                    text-[#848484]
                    pl-[52px]
                    pt-[10px]
                  "
                    >
                      High average watch time for similar topics
                    </p>
                  </div>
                  <div>
                    <div
                      className="
                flex
                flex-row
                  w-[378px]
                  h-[44px]
                "
                    >
                      <div
                        className="
                  flex
                  flex-row
                  bg-[#e6ffc1]
                  w-[44px]
                  h-[44px]
                  rounded-[8px]
                  text-[#364B20]
                  items-center
                  justify-center
                  m-[2px]
                  mt-[32px]
                  "
                      >
                        <PiCrownSimpleLight
                          className="
                      w-[24px]
                      h-[24px]
                    "
                        />

                      </div>
                      <span
                        className="
                    text-[16px]
                    font-medium
                    flex
                    pt-[32px]
                    pl-[8px]
                  "
                      >
                        Trending among similar creators
                      </span>
                    </div>
                    <p
                      className="
                    text-[12px]
                    font-medium
                    text-[#848484]
                    pl-[52px]
                    pt-[10px]
                  "
                    >
                      More creators are publishing content on this topic.
                    </p>
                  </div>
                  <div>
                    <div
                      className="
                flex
                flex-row
                  w-[378px]
                  h-[44px]
                "
                    >
                      <div
                        className="
                  flex
                  flex-row
                  bg-[#fde3d9]
                  w-[44px]
                  h-[44px]
                  rounded-[8px]
                  text-[#e52626]
                  items-center
                  justify-center
                  m-[2px]
                  mt-[32px]
                  "
                      >
                        <LuClapperboard
                          className="
                      w-[24px]
                      h-[24px]
                    "
                        />

                      </div>
                      <span
                        className="
                    text-[16px]
                    font-medium
                    flex
                    pt-[32px]
                    pl-[8px]
                  "
                      >
                        Competition is moderate
                      </span>
                    </div>
                    <p
                      className="
                    text-[12px]
                    font-medium
                    text-[#848484]
                    pl-[52px]
                    pt-[10px]
                  "
                    >
                      You can rank with the right approach
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="
                      flex
                      flex-col
                      bg-white
                      p-[16px]
                      w-[410px]
                      h-[282px]
                      rounded-[12px]
                      mt-10
                    "
              >
                <span
                  className="
                    text-[20px]
                    font-medium
                    pb-[16px]
                  "
                >
                  Actionable Tips
                </span>
                <div
                  className="
                    flex
                    flex-row
                    w-[378px]
                    h-[44px]
                    mb-[12px]
                    items-center
                  "
                >
                  <div
                    className="
                  flex
                  flex-row
                  bg-[#F5F4FB]
                  w-[44px]
                  h-[44px]
                  rounded-[3px]
                  items-center
                  justify-center
                  "
                  >
                    <PiMagicWand
                      className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                    text-[#2C2C4C]
                    "
                    />
                  </div>
                  <span
                    className="
                    flex
                    text-[16px]
                    font-medium
                    pl-[8px]
                  "
                  >
                    Focus on a specific pain point
                  </span>
                </div>
                <div
                  className="
                    flex
                    flex-row
                    w-[378px]
                    h-[44px]
                    mb-[12px]
                    items-center
                  "
                >
                  <div
                    className="
                  flex
                  flex-row
                  bg-[#F5F4FB]
                  w-[44px]
                  h-[44px]
                  rounded-[3px]
                  items-center
                  justify-center
                  "
                  >
                    <PiMagicWand
                      className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                    text-[#2C2C4C]
                    "
                    />
                  </div>
                  <span
                    className="
                    flex
                    text-[16px]
                    font-medium
                    pl-[8px]
                  "
                  >
                    Use curiosity in your title and hook
                  </span>
                </div>
                <div
                  className="
                    flex
                    flex-row
                    w-[378px]
                    h-[44px]
                    mb-[12px]
                    items-center
                  "
                >
                  <div
                    className="
                  flex
                  flex-row
                  bg-[#F5F4FB]
                  w-[44px]
                  h-[44px]
                  rounded-[3px]
                  items-center
                  justify-center
                  "
                  >
                    <PiMagicWand
                      className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                    text-[#2C2C4C]
                    "
                    />
                  </div>
                  <span
                    className="
                    flex
                    text-[16px]
                    font-medium
                    pl-[8px]
                  "
                  >
                    Create a high-contrast thumbnail
                  </span>
                </div>
                <div
                  className="
                    flex
                    flex-row
                    w-[378px]
                    h-[44px]
                    items-center
                  "
                >
                  <div
                    className="
                  flex
                  flex-row
                  bg-[#F5F4FB]
                  w-[44px]
                  h-[44px]
                  rounded-[3px]
                  items-center
                  justify-center
                  "
                  >
                    <PiMagicWand
                      className="
                    flex
                    flex-row
                    w-[24px]
                    h-[24px]
                    text-[#2C2C4C]
                    "
                    />
                  </div>
                  <span
                    className="
                    flex
                    text-[16px]
                    font-medium
                    pl-[8px]
                  "
                  >
                    Keep the pacing fast
                  </span>
                </div>
              </div>
            </div>
            <div
              className="
                flex
                flex-row
                mt-[42px]
                "
            >
              <div
                className="
                p-[16px]
                w-[600px]
                h-[692px]
                bg-white
                rounded-[12px]
                "
              >
                <span
                  className="
                    text-[20px]
                    font-medium
                    pb-[8px]
                  "
                >
                  Score Breakdown
                </span>
                <div
                  className="
                    h-[30px]
                    rounded-[3px]
                    items-center
                    justify-center
                    mt-[8px]
                    ml-[8px]
                    inline-block
                    "
                  style={{ backgroundColor: overall.bgColor }}
                >
                  <span
                    className="
                    text-[14px]
                    font-semibold
                    px-3
                    "
                    style={{ color: overall.color }}
                  >
                    {overall.label}
                  </span>
                </div>

                <div
                  className="
                    flex
                    flex-row
                    items-end
                    w-[500px]
                    h-[280px]
                    gap-x-[16px]
                    pl-[50px]
                    "
                >
                  {metrics.map((m) => {
                    const col = getColumnStyle(m.score)
                    return (
                      <div
                        key={m.label}
                        className="
                          flex
                          flex-col
                          items-center
                          w-[100px]
                        "
                      >
                        <span className="font-semibold text-[20px] pb-[8px]">{m.score}</span>
                        <div
                          className="
                          flex
                          flex-col
                          justify-start
                          items-start
                          rounded-[12px]
                          p-[10px]
                          "
                          style={{
                            width: '100px',
                            height: `${col.height}px`,
                            backgroundColor: col.barColor
                          }}
                        >
                          <span className="font-semibold text-[14px] text-white capitalize">
                            {col.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {metrics.map((m) => {
                  const category = getGaugeScoreStyle(m.score)
                  return (
                    <div
                      key={m.label}
                      className="
                      flex
                      flex-row
                        w-[391px]
                        h-[78px]
                      "
                    >
                      <h1
                        className="
                          flex
                          flex-row
                          text-[48px]
                          font-medium
                        "
                        style={{ color: category.color }}
                      >
                        {m.score} <p className=" text-[#848484] text-[14px] mt-[36px]">/100</p>
                      </h1>
                      <div
                        className="
                        flex
                        flex-row
                          h-[24px]
                          px-[10px]
                          py-[4px]
                          rounded-[4px]
                          items-center
                          justify-center
                          mt-[30px]
                          ml-[8px]
                          whitespace-nowrap
                        "
                        style={{ backgroundColor: category.bgColor }}
                      >
                        <p
                          className="
                            text-[15px]
                            capitalize
                          "
                          style={{ color: category.color }}
                        >
                          {category.label}
                        </p>
                      </div>
                      <p
                        className="
                            text-[#848484]
                            text-[15px]
                            mt-[30px]
                          ml-[8px]
                          "
                      >
                        {m.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div
            className="
            flex
            flex-row
            border
            border-[#daedd9]
              bg-[#ecf7ec]
              w-[1530px]
              h-[180px]
              rounded-[20px]
              mt-[42px]
              ml-[42px]
            "
          >
            <img
              src="/shieldcheck.png"
              alt="Green Shield"
              className="
              flex
              flex-col
              object-none
              "
            />
            <h1
              className="
              flex
              flex-col
              text-[#82B76B]
              text-[32px]
              font-semibold 
              "
            >
              <p
                className="
                flex
                flex-col
                text-black
                text-[20px]
                h-[25px]
                font-medium
                pt-[40px]
                pb-[32px]
                "
              >
                Verdict
              </p>
              Strong Opportunity for your Channel
              <p
                className="
                text-[14px]
                text-[#838B8E]
                font-medium
                pb-[32px]
                pt-[16px]
                "
              >
                This topic is a great opportunity. We recommend creating this content.
              </p>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}