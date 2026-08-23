'use client'

import { useEffect, useState } from "react"
import { HiOutlineArrowUpRight } from "react-icons/hi2"
import { HiLightBulb } from "react-icons/hi"
import Button from "../../components/Button"
import { LuRefreshCcw } from "react-icons/lu"
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import { GoCheckCircleFill } from "react-icons/go"
import ScorerChart from "../../libs/ScorerChart"
import EmotionalChart from "../../libs/EmotionalChart"
import RetentionChart from "../../libs/RetentionChart"
import CuriosityChart from "../../libs/CuriosityChart"
import ClarityChart from "../../libs/ClarityChart"
import RewriteSuggestionCard from "../components/RewriteSuggestionCard"
import { getMiniScoreStyle, getMetricMessage } from "../../libs/scoreUtils"
import api from "../../../../eclairr/src/services/api"
import { useAuth } from "../../components/AuthContext"
import Header from "../components/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface PageProps {
  params: { hook: string }
}

interface RewriteSuggestion {
  text: string
  score: number
}

interface HookDetailData {
  thumbnailUrl: any
  _id: string
  hookText: string
  hookScore: number
  emotionalPull: number
  retentionPotential: number
  curiosity: number
  clarity: number
  rewriteSuggestions: RewriteSuggestion[]
}

export default function ScoredPage({ params }: PageProps) {
  const hook = decodeURIComponent(params.hook)
  const [hookDetail, setHookDetail] = useState<HookDetailData | null>(null)
  const [saved, setSaved] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    api.get("/hookDetail", { params: { hookText: hook } })
      .then((res) => {
        const found = res.data?.hookDetail?.[0]
        if (found) setHookDetail(found)
      })
      .catch((err) => console.error("Erro ao buscar hookDetail:", err))
  }, [hook])

  if (!hookDetail) {
    return (
      <div className="w-full px-[32px] overflow-y-auto">
        <Header />
        <div className="flex flex-row flex-grow mb-[24px]">
          <Sidebar />
          <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
            <div
              className="
                pl-[32px]
                pt-[16px]
                tracking-tighter
                flex
                flex-row
                gap-[24px]
              "
            >
              <div>
                <Skeleton width={280} height={48} />

                {/* Card principal do hook */}
                <div
                  className="
                    bg-white
                    w-[853px]
                    h-[306px]
                    px-[24px]
                    rounded-[12px]
                    mt-[16px]
                  "
                >
                  <div
                    className="
                      flex
                      flex-row
                      items-center
                      justify-between
                      pt-[24px]
                    "
                  >
                    <div>
                      <div className="w-[430px] pb-[8px]">
                        <Skeleton width={420} height={28} />
                        <Skeleton width={300} height={28} />
                      </div>
                      <Skeleton count={2} height={12} width={400} />
                      <div className="mt-[16px]">
                        <Skeleton width={179} height={44} borderRadius={5} />
                      </div>
                    </div>
                    <Skeleton circle width={180} height={180} />
                  </div>
                </div>

                {/* 4 cards de métricas */}
                <div
                  className="
                    flex
                    flex-row
                    gap-[12px]
                    my-[32px]
                  "
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="
                        bg-white
                        rounded-[12px]
                        p-[16px]
                        w-[204px]
                        h-[218px]
                      "
                    >
                      <div className="flex flex-row items-center gap-x-[8px]">
                        <Skeleton circle width={8} height={8} />
                        <Skeleton width={110} height={16} />
                      </div>
                      <div className="flex flex-row items-center mt-[20px] gap-x-[16px]">
                        <Skeleton circle width={64} height={64} />
                        <Skeleton width={70} height={16} />
                      </div>
                      <div className="pt-[20px]">
                        <Skeleton count={3} height={10} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rewrite suggestions */}
                <div
                  className="
                    bg-[#DBDAE5]
                    w-[853px]
                    rounded-[12px]
                    p-[16px]
                  "
                >
                  <div className="pb-[32px]">
                    <Skeleton width={220} height={28} />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} width={821} height={64} borderRadius={8} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {/* Botões */}
                <div
                  className="
                    flex
                    flex-row
                    gap-[12px]
                    ml-[266px]
                    mt-[16px]
                  "
                >
                  <Skeleton width={212} height={48} borderRadius={8} />
                  <Skeleton width={167} height={48} borderRadius={8} />
                </div>

                {/* Actionable tips */}
                <div
                  className="
                    bg-white
                    w-[630px]
                    h-[540px]
                    rounded-[12px]
                    p-[16px]
                    mt-[24px]
                    ml-[32px]
                  "
                >
                  <div className="flex flex-row items-center gap-x-[8px]">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={160} height={22} />
                  </div>
                  <div className="mt-[16px] mb-[32px]">
                    <Skeleton count={3} height={14} />
                  </div>

                  <div
                    className="
                      bg-[#F8F6FD]
                      w-[600px]
                      h-[150px]
                      rounded-[12px]
                      p-[16px]
                    "
                  >
                    <Skeleton width={180} height={22} />
                    <div className="mt-[16px] flex flex-col gap-y-[8px]">
                      <div className="flex flex-row items-center gap-x-[8px]">
                        <Skeleton circle width={24} height={24} />
                        <Skeleton width={260} height={16} />
                      </div>
                      <div className="flex flex-row items-center gap-x-[8px]">
                        <Skeleton circle width={24} height={24} />
                        <Skeleton width={220} height={16} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      bg-[#FEF9F3]
                      w-[600px]
                      h-[150px]
                      rounded-[12px]
                      p-[16px]
                      mt-[32px]
                    "
                  >
                    <Skeleton width={180} height={22} />
                    <div className="mt-[16px] flex flex-col gap-y-[8px]">
                      <div className="flex flex-row items-center gap-x-[8px]">
                        <Skeleton circle width={24} height={24} />
                        <Skeleton width={260} height={16} />
                      </div>
                      <div className="flex flex-row items-center gap-x-[8px]">
                        <Skeleton circle width={24} height={24} />
                        <Skeleton width={220} height={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick tips */}
                <div
                  className="
                    bg-white
                    w-[630px]
                    h-[350px]
                    rounded-[12px]
                    p-[16px]
                    mt-[24px]
                    ml-[32px]
                  "
                >
                  <Skeleton width={140} height={26} />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-row items-center gap-x-[8px] mt-[16px] mb-[16px]">
                      <Skeleton width={44} height={44} borderRadius={3} />
                      <Skeleton width={320} height={20} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </div>
      </div>
    )
  }

  const emotionalStyle = getMiniScoreStyle(hookDetail.emotionalPull)
  const retentionStyle = getMiniScoreStyle(hookDetail.retentionPotential)
  const curiosityStyle = getMiniScoreStyle(hookDetail.curiosity)
  const clarityStyle = getMiniScoreStyle(hookDetail.clarity)

  const handleSaveAnalysis = async () => {
    if (saved) return
  
    try {
      await api.post('/analysis', {
        user: user?._id,
        type: 'hook-scorer',
        inputText: hook,
        thumbnailUrl: hookDetail.thumbnailUrl,
        score: hookDetail.hookScore,
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
        pl-[32px]
        pt-[16px]
        tracking-tighter
        flex
        flex-row
        gap-[24px]
      "
    >
      <div>
        <h1
          className="
            text-[48px]
            font-medium
          "
        >
          Hook Scorer
        </h1>
        <div
          className="
            bg-white
            w-[853px]
            h-[306px]
            px-[24px]
            rounded-[12px]
            mt-[16px]
          "
        >
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              "
          >
            <div>
              <p
                className="
                text-[32px]
                tracking-tighter
                w-[430px]
                pb-[8px]
                "
              >
                {hook}
              </p>
              <p
                className="
                  text-[14px]
                  text-[#848484]
                  tracking-normal
                "
              >
                This score predicts how well your topic is likely to perform based on audience interest,
                competition, search demand, and historical performance patterns.
              </p>
              <Button
                onClick={() => { }}
                className="
                flex
                flex-row
                  w-[179px]
                  h-[44px]
                bg-[#ECF7EC]
                rounded-[5px]
                border
                border-[#608B4D]
                border-[0.6px]
                mt-[16px]
                hover:cursor-pointer
                hover:scale-110
                transition
                py-[4px]
                px-[8px]
                items-center
                "
              >
                <HiOutlineArrowUpRight
                  className="
                  text-[#608B4D] 
                "
                  size={24}
                />
                <p
                  className="
                    whitespace-nowrap
                    text-[15px]
                    text-[#608B4D]
                    font-semibold
                    pl-[8px]
                  "
                >
                  Top 27% of Hooks
                </p>
              </Button>
            </div>
            <ScorerChart score={hookDetail.hookScore} />
          </div>
        </div>
        <div
          className="
            flex
            flex-row
            gap-[12px]
            my-[32px]
          "
        >
          <div
            className="
              bg-white
              rounded-[12px]
              p-[16px]
              w-[204px]
              h-[218px]
            "
          >
            <div
              className="
                flex
                flex-row
                items-center
              "
            >
              <div
                className="
                flex
                flex-row
                w-[8px]
                h-[8px]
                rounded-full
              "
                style={{ backgroundColor: emotionalStyle.dotColor }}
              />
              <h2
                className="
                flex
                flex-row
                text-[16px]
                font-semibold
                pl-[8px]
              "
              >
                Emotional Pull
              </h2>
            </div>
            <div
              className="
              flex
              flex-row
              items-center
                mt-[20px]
              "
            >
              <EmotionalChart value={hookDetail.emotionalPull} />
              <span
                className="
                  text-[16px]
                  font-semibold
                  pl-[20px]
                "
                style={{ color: emotionalStyle.textColor }}
              >
                {emotionalStyle.label}
              </span>
            </div>
            <p
              className="
                text-[14px]
                text-[#838B8E]
                pt-[20px]
                font-light
              "
            >
              {getMetricMessage("emotionalPull", hookDetail.emotionalPull)}
            </p>
          </div>
          <div
            className="
              bg-white
              rounded-[12px]
              p-[16px]
              w-[204px]
              h-[218px]
            "
          >
            <div
              className="
                flex
                flex-row
                items-center
              "
            >
              <div
                className="
                flex
                flex-row
                w-[8px]
                h-[8px]
                rounded-full
              "
                style={{ backgroundColor: retentionStyle.dotColor }}
              />
              <h2
                className="
                flex
                flex-row
                text-[16px]
                font-semibold
                pl-[8px]
              "
              >
                Retention Potential
              </h2>
            </div>
            <div
              className="
              flex
              flex-row
              items-center
                mt-[20px]
              "
            >
              <RetentionChart value={hookDetail.retentionPotential} />
              <span
                className="
                  text-[16px]
                  font-semibold
                  pl-[20px]
                "
                style={{ color: retentionStyle.textColor }}
              >
                {retentionStyle.label}
              </span>
            </div>
            <p
              className="
                text-[14px]
                text-[#838B8E]
                pt-[20px]
                font-light
              "
            >
              {getMetricMessage("retentionPotential", hookDetail.retentionPotential)}
            </p>
          </div>
          <div
            className="
              bg-white
              rounded-[12px]
              p-[16px]
              w-[204px]
              h-[218px]
            "
          >
            <div
              className="
                flex
                flex-row
                items-center
              "
            >
              <div
                className="
                flex
                flex-row
                w-[8px]
                h-[8px]
                rounded-full
              "
                style={{ backgroundColor: curiosityStyle.dotColor }}
              />
              <h2
                className="
                flex
                flex-row
                text-[16px]
                font-semibold
                pl-[8px]
              "
              >
                Curiosity
              </h2>
            </div>
            <div
              className="
              flex
              flex-row
              items-center
                mt-[20px]
              "
            >
              <CuriosityChart value={hookDetail.curiosity} />
              <span
                className="
                  text-[16px]
                  font-semibold
                  pl-[20px]
                "
                style={{ color: curiosityStyle.textColor }}
              >
                {curiosityStyle.label}
              </span>
            </div>
            <p
              className="
                text-[14px]
                text-[#838B8E]
                pt-[20px]
                font-light
              "
            >
              {getMetricMessage("curiosity", hookDetail.curiosity)}
            </p>
          </div>
          <div
            className="
              bg-white
              rounded-[12px]
              p-[16px]
              w-[204px]
              h-[218px]
            "
          >
            <div
              className="
                flex
                flex-row
                items-center
              "
            >
              <div
                className="
                flex
                flex-row
                w-[8px]
                h-[8px]
                rounded-full
              "
                style={{ backgroundColor: clarityStyle.dotColor }}
              />
              <h2
                className="
                flex
                flex-row
                text-[16px]
                font-semibold
                pl-[8px]
              "
              >
                Clarity
              </h2>
            </div>
            <div
              className="
              flex
              flex-row
              items-center
                mt-[20px]
              "
            >
              <ClarityChart value={hookDetail.clarity} />
              <span
                className="
                  text-[16px]
                  font-semibold
                  pl-[20px]
                "
                style={{ color: clarityStyle.textColor }}
              >
                {clarityStyle.label}
              </span>
            </div>
            <p
              className="
                text-[14px]
                text-[#838B8E]
                pt-[20px]
                font-light
              "
            >
              {getMetricMessage("clarity", hookDetail.clarity)}
            </p>
          </div>
        </div>
        <div
          className="
            bg-[#DBDAE5]
            w-[853px]
            rounded-[12px]
            p-[16px]
          "
        >
          <h1
            className="
              text-[24px]
              font-semibold
              pb-[32px]
            "
          >
            Rewrite Suggestions
          </h1>
          <div
            className="
              flex
              flex-col
              gap-[12px]
            "
          >
            {hookDetail.rewriteSuggestions.map((suggestion, index) => (
              <RewriteSuggestionCard
                key={index}
                text={suggestion.text}
                score={suggestion.score}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div
          className="
          flex
          flex-row
          gap-[12px]
          ml-[266px]
          "
        >
          <Button
            onClick={() => { }}
            href="/scorerSearch"
            className="
          flex
          flex-row
          bg-white
          rounded-[8px]
          px-[16px]
          w-[212px]
          h-[48px]
          items-center
          mt-[16px]
          hover:cursor-pointer
          hover:scale-110
          transition
        "
          >
            <LuRefreshCcw
              className="
              text-[#848484]
              w-[24px]
              h-[24px]
              mr-[8px]
            "
            />
            <span
              className="
              text-[16px]
              font-medium
            "
            >
              Score another Hook
            </span>
          </Button>

          <Button
            onClick={handleSaveAnalysis}
            className="
          flex
          flex-row
          bg-black
          rounded-[8px]
          px-[16px]
          w-[167px]
          h-[48px]
          items-center
          mt-[16px]
          hover:cursor-pointer
          hover:scale-110
          transition          
        "
          >
            {saved ? (
              <FaBookmark
                className="
              text-white
              w-[24px]
              h-[24px]
              mr-[8px]
            "
              />
            ) : (
              <FaRegBookmark
                className="
              text-white
              w-[24px]
              h-[24px]
              mr-[8px]
            "
              />
            )}
            <span
              className="
              text-white
              text-[16px]
              font-medium
            "
            >
              {saved ? 'Saved!' : 'Save Analysis'}
            </span>
          </Button>
        </div>
        <div
          className="
          bg-white
          w-[630px]
          h-[540px]
          rounded-[12px]
          p-[16px]
          mt-[24px]
          ml-[32px]
        "
        >
          <div
            className="
              flex
              flex-row
            "
          >
            <HiLightBulb size={24} />
            <h1
              className="
              text-[20px]
              font-medium
              ml-[8px]
            "
            >
              Actionable Tips
            </h1>
          </div>
          <p
            className="
              text-[16px]
              text-[#848484]
              mt-[16px]
              mb-[32px]
            "
          >
            Your hook creates curiosity by highlighting a common
            mistake. It's clear and easy to understand, which is great. To
            make it more powerful, try adding a stronger emotional
            angle or a specific benefit to increase retention and clicks.
          </p>
          <div
            className="
              bg-[#F8F6FD]
              w-[600px]
              h-[150px]
              rounded-[12px]
              p-[16px]
            "
          >
            <span
              className="
                text-[20px]
                text-[#8B6FE0]
                font-semibold
              "
            >
              What's working well
            </span>
            <div
              className="
              flex
              flex-row
            "
            >
              <GoCheckCircleFill
                className="
              text-[#AC95F4]
              w-[24px]
              h-[24px]
              mt-[16px]
              "
              />
              <p
                className="
                text-[18px]
                  mt-[14px]
                  ml-[8px]
                  text-[#AC95F4]
                "
              >Creates curiosity with a Problem</p>
            </div>
            <div
              className="
              flex
              flex-row
            "
            >
              <GoCheckCircleFill
                className="
              text-[#AC95F4]
              w-[24px]
              h-[24px]
              mt-[16px]
              "
              />
              <p
                className="
                text-[18px]
                  mt-[14px]
                  ml-[8px]
                  text-[#AC95F4]
                "
              >Clear and easy to understand</p>
            </div>
          </div>
          <div
            className="
              bg-[#FEF9F3]
              w-[600px]
              h-[150px]
              rounded-[12px]
              p-[16px]
              mt-[32px]
            "
          >
            <span
              className="
                text-[20px]
                text-[#FF4902]
                font-semibold
              "
            >
              What could be Better
            </span>
            <div
              className="
              flex
              flex-row
            "
            >
              <GoCheckCircleFill
                className="
              text-[#FF804F]
              w-[24px]
              h-[24px]
              mt-[16px]
              "
              />
              <p
                className="
                text-[18px]
                  mt-[14px]
                  ml-[8px]
                  text-[#FF804F]
                "
              >Emotional pull could be stronger</p>
            </div>
            <div
              className="
              flex
              flex-row
            "
            >
              <GoCheckCircleFill
                className="
              text-[#FF804F]
              w-[24px]
              h-[24px]
              mt-[16px]
              "
              />
              <p
                className="
                text-[18px]
                  mt-[14px]
                  ml-[8px]
                  text-[#FF804F]
                "
              >Doesn't hint at the big payoff yet</p>
            </div>
          </div>
        </div>
        <div
          className="
            bg-white
            w-[630px]
            h-[350px]
            rounded-[12px]
            p-[16px]
          mt-[24px]
          ml-[32px]
          "
        >
          <span
            className="
              text-[24px]
              font-medium
            "
          >
            Quick Tips
          </span>
          <div
            className="
              flex
              flex-row
              items-center
            "
          >
            <div
              className="
              bg-[#F5F4FB]
              w-[44px]
              h-[44px]
              rounded-[3px]
              mt-[16px]
              mb-[16px]
              p-2
            "
            >
              <HiLightBulb
                className="
                text-[#8B6FE0]
              "
                size={24}
              />
            </div>
            <p
              className="
                text-[20px]
                font-medium
                whitespace-nowrap
                ml-[8px]
              "
            >
              Start with a surprising statement
            </p>
          </div>
          <div
            className="
              flex
              flex-row
              items-center
            "
          >
            <div
              className="
              bg-[#F5F4FB]
              w-[44px]
              h-[44px]
              rounded-[3px]
              mt-[16px]
              mb-[16px]
              p-2
            "
            >
              <HiLightBulb
                className="
                text-[#8B6FE0]
              "
                size={24}
              />
            </div>
            <p
              className="
                text-[20px]
                font-medium
                whitespace-nowrap
                ml-[8px]
              "
            >
              Highlight the benefit or outcome early
            </p>
          </div>
          <div
            className="
              flex
              flex-row
              items-center
            "
          >
            <div
              className="
              bg-[#F5F4FB]
              w-[44px]
              h-[44px]
              rounded-[3px]
              mt-[16px]
              mb-[16px]
              p-2
            "
            >
              <HiLightBulb
                className="
                text-[#8B6FE0]
              "
                size={24}
              />
            </div>
            <p
              className="
                text-[20px]
                font-medium
                whitespace-nowrap
                ml-[8px]
              "
            >
              Use emotion to create a stronger connection
            </p>
          </div>
          <div
            className="
              flex
              flex-row
              items-center
            "
          >
            <div
              className="
              bg-[#F5F4FB]
              w-[44px]
              h-[44px]
              rounded-[3px]
              mt-[16px]
              mb-[16px]
              p-2
            "
            >
              <HiLightBulb
                className="
                text-[#8B6FE0]
              "
                size={24}
              />
            </div>
            <p
              className="
                text-[20px]
                font-medium
                whitespace-nowrap
                ml-[8px]
              "
            >
              Keep it short and punchy (6–12 words)
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}