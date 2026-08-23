'use client'

import { useEffect, useState } from "react"
import { GoCheckCircleFill } from "react-icons/go"
import { HiLightBulb } from "react-icons/hi"
import Button from "../../components/Button"
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import { LuRefreshCcw } from "react-icons/lu"
import { HiOutlineArrowUpRight } from "react-icons/hi2"
import CTRChart from "../../libs/CTRChart"
import BarGauge from "../../libs/BarGauge"
import api from "../../../../eclairr/src/services/api"
import { useAuth } from "../../components/AuthContext"
import { getTitleLengthAssessment } from "../../libs/titleLengthUtils"
import { getPredictorScoreStyle } from "../../libs/predictiorScoreUtils"
import Header from "../components/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface PageProps {
  params: { title: string }
}

interface ThumbnailDetailData {
  thumbnailUrl: string
  title: string
  ctrPrediction: number
  titleScore: number
  thumbnailScore: number
  insights: string
}

const Predicted = ({ params }: PageProps) => {
  const title = decodeURIComponent(params.title)
  const [thumbnailDetail, setThumbnailDetail] = useState<ThumbnailDetailData | null>(null)
  const [saved, setSaved] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    api.get('/thumbnailDetail', { params: { title } })
      .then((res) => {
        const found = res.data?.thumbnailDetail?.[0]
        if (found) setThumbnailDetail(found)
      })
      .catch((err) => console.error('Erro ao buscar thumbnailDetail:', err))
  }, [title])

  const handleSaveAnalysis = async () => {
    if (!thumbnailDetail || saved) return

    const averageScore = Math.round(
      (thumbnailDetail.ctrPrediction + thumbnailDetail.titleScore + thumbnailDetail.thumbnailScore) / 3
    )

    try {
      await api.post('/analysis', {
        user: user?._id,
        type: 'title-thumbnail-predictor',
        inputText: title,
        thumbnailUrl: thumbnailDetail.thumbnailUrl,
        score: averageScore,
        createdAt: new Date()
      })
      setSaved(true)
    } catch (err) {
      console.error('Erro ao salvar análise:', err)
    }
  }

  if (!thumbnailDetail) {
    return (
      <div className="w-full px-[32px]">
        <Header />
        <div className="flex flex-row flex-grow mb-[24px]">
          <Sidebar />
          <SkeletonTheme baseColor="#E4E4EF" highlightColor="#F6F6FC">
            <div>
              {/* Cabeçalho: título + botões */}
              <div className="flex flex-row items-center">
                <div className="ml-[32px] mt-[16px]">
                  <Skeleton width={360} height={32} />
                </div>
                <div className="ml-[720px] mt-[32px]">
                  <Skeleton width={221} height={48} borderRadius={8} />
                </div>
                <div className="ml-[16px] mt-[32px]">
                  <Skeleton width={167} height={48} borderRadius={8} />
                </div>
              </div>

              <div
                className="
                  flex
                  flex-row
                  ml-[34px]
                  mt-[16px]
                  gap-[16px]
                "
              >
                {/* Coluna esquerda */}
                <div>
                  {/* Card thumbnail + título */}
                  <div
                    className="
                      bg-white
                      rounded-[12px]
                      w-[828px]
                      h-[258px]
                      p-[16px]
                    "
                  >
                    <div className="flex flex-row">
                      <Skeleton width={304} height={218} borderRadius={8} />
                      <div className="ml-[32px] w-[442px]">
                        <Skeleton width={420} height={30} />
                        <Skeleton width={280} height={30} />
                        <div className="mt-[16px] mb-[32px]">
                          <Skeleton count={2} height={12} />
                        </div>
                        <div className="flex flex-row gap-x-[18px]">
                          <Skeleton width={118} height={44} borderRadius={4} />
                          <Skeleton width={107} height={44} borderRadius={4} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div
                    className="
                      bg-white
                      w-[828px]
                      h-[512px]
                      p-[16px]
                      rounded-[12px]
                      mt-[16px]
                    "
                  >
                    <div className="flex flex-row items-center gap-x-[8px] mb-[16px]">
                      <Skeleton circle width={24} height={24} />
                      <Skeleton width={120} height={22} />
                    </div>
                    <Skeleton count={3} height={12} />

                    <div
                      className="
                        bg-[#F8F6FD]
                        p-[16px]
                        rounded-[12px]
                        w-[796px]
                        h-[150px]
                        mt-[32px]
                      "
                    >
                      <Skeleton width={180} height={22} />
                      <div className="mt-[16px] flex flex-col gap-y-[12px]">
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton circle width={24} height={24} />
                          <Skeleton width={320} height={14} />
                        </div>
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton circle width={24} height={24} />
                          <Skeleton width={220} height={14} />
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                        bg-[#FEF9F3]
                        p-[16px]
                        rounded-[12px]
                        w-[796px]
                        h-[150px]
                        mt-[32px]
                      "
                    >
                      <Skeleton width={180} height={22} />
                      <div className="mt-[16px] flex flex-col gap-y-[12px]">
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton circle width={24} height={24} />
                          <Skeleton width={260} height={14} />
                        </div>
                        <div className="flex flex-row items-center gap-x-[8px]">
                          <Skeleton circle width={24} height={24} />
                          <Skeleton width={280} height={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna direita */}
                <div className="flex flex-col gap-[16px]">
                  {/* CTR Prediction */}
                  <div
                    className="
                      bg-white
                      w-[700px]
                      h-[258px]
                      p-[16px]
                      rounded-[12px]
                    "
                  >
                    <Skeleton width={140} height={22} />
                    <div className="flex flex-row items-center mt-[16px] gap-x-[24px]">
                      <Skeleton circle width={160} height={160} />
                      <div className="flex flex-col">
                        <Skeleton count={3} height={12} width={280} />
                        <div className="mt-[32px]">
                          <Skeleton width={178} height={44} borderRadius={4} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title Score / Thumbnail Score */}
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="
                        flex
                        flex-col
                        bg-white
                        w-[700px]
                        h-[228px]
                        p-[16px]
                        rounded-[12px]
                      "
                    >
                      <Skeleton width={140} height={22} />
                      <div className="flex flex-row items-center gap-x-[8px] mt-[16px]">
                        <Skeleton width={70} height={48} />
                        <Skeleton width={70} height={36} borderRadius={4} />
                      </div>
                      <div className="mt-[16px]">
                        <Skeleton height={24} />
                      </div>
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

  const {
    thumbnailUrl,
    ctrPrediction,
    titleScore,
    thumbnailScore
  } = thumbnailDetail

  const lengthAssessment = getTitleLengthAssessment(title)
  const ctrStyle = getPredictorScoreStyle(ctrPrediction * 10)

  const scores = [
    { label: 'Title Score', value: titleScore },
    { label: 'Thumbnail Score', value: thumbnailScore }
  ]

  return (
    <div className="w-full px-[32px]">
    <Header />
    <div className="flex flex-row flex-grow mb-[24px]">
      <Sidebar />
    <div>
      <div
        className="
          flex
          flex-row
        "
      >
        <h1
          className="
          text-[32px]
          font-medium
          ml-[32px]
          mt-[16px]
        "
        >
          Title & Thumbnail Predictor
        </h1>
        <Button
          onClick={() => { }}
          href="/predictSearch"
          className="
            flex
            flex-row
            bg-white
            w-[221px]
            h-[48px]
            rounded-[8px]
            p-[16px]
            ml-[720px]
            mt-[32px]
            items-center
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
            "
          />
          <span
            className="
              text-[16px]
              font-light
              ml-[8px]
            "
          >
            Test Another Version
          </span>
        </Button>
        <Button
          onClick={handleSaveAnalysis}
          className="
            flex
            flex-row
            bg-black
            w-[167px]
            h-[48px]
            rounded-[8px]
            p-[16px]
            ml-[16px]
            mt-[32px]
            items-center
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
              "
            />
          ) : (
            <FaRegBookmark
              className="
                text-white
                w-[24px]
                h-[24px]
              "
            />
          )}
          <span
            className="
              text-[16px]
              text-white
              font-light
              ml-[8px]
            "
          >
            {saved ? 'Saved!' : 'Save Analysis'}
          </span>
        </Button>
      </div>
      <div
        className="
          flex
          flex-row
          ml-[34px]
          mt-[16px]
          gap-[16px]
        "
      >
        <div>
          <div
            className="
              bg-white
              rounded-[12px]
              w-[828px]
              h-[258px]
              p-[16px]
            "
          >
            <div
              className="
                flex
                flex-row
              "
            >
              <img
                src={thumbnailUrl}
                className="
                  w-[304px]
                  h-[218px]
                  rounded-[8px]
                  object-cover
                  shrink-0
                "
              />
              <div>
              <h2
                  className="
                  max-w-[442px]
                  text-[32px]
                  ml-[32px]
                  line-clamp-2
                  overflow-hidden
                "
                >
                  {title}
                </h2>
                <p
                  className="
                  text-[14px]
                  text-[#838B8E]
                  mb-[32px]
                  ml-[32px]
                  "
                >
                  The title is clear, specific, and creates curiosity while hinting at
                  valuable information.
                </p>
                <div
                  className="
                    flex
                    flex-row
                  "
                >
                  <div
                    className="
                    bg-[#F8F6FD]
                    border
                    rounded-[4px]
                    w-[118px]
                    h-[44px]
                    px-[16px]
                    py-[4px]
                    ml-[32px]
                    hover:cursor-pointer
                    hover:scale-110
                    transition
                  "
                  >
                    <span
                      className="
                    text-[12px]
                    font-semibold
                    text-[#8061E2]
                    whitespace-nowrap 
                    "
                    >
                      {lengthAssessment.charCount} Characters
                    </span>
                  </div>
                  <div
                    className="
                    border
                    rounded-[4px]
                    w-[107px]
                    h-[44px]
                    px-[16px]
                    py-[4px]
                    ml-[18px]
                    hover:cursor-pointer
                    hover:scale-110
                    transition
                  "
                    style={{ backgroundColor: lengthAssessment.bgColor }}
                  >
                    <span
                      className="
                    text-[12px]
                    font-semibold
                    whitespace-nowrap 
                    "
                      style={{ color: lengthAssessment.textColor }}
                    >
                      {lengthAssessment.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              bg-white
              w-[828px]
              h-[512px]
              p-[16px]
              rounded-[12px]
              mt-[16px]
            "
          >
            <div
              className="
                flex
                flex-row
                mb-[16px]
              "
            >
              <HiLightBulb size={24} />
              <h1
                className="
                  text-[20px]
                  ml-[8px]
                  font-medium
                "
              >
                Ai Insights
              </h1>
            </div>
            <p
              className="
                  text-[14px]
                  text-[#838B8E]
                "
            >
              This combination is likely to perform very well.
              The title creates curiosity and promise while the thumbnail
              uses a strong facial expression and clear text to grab attention.
              It aligns with what your audience is interested in and stands out
              in search and recommended feeds.
            </p>
            <div
              className="
              bg-[#F8F6FD]
              p-[16px]
              rounded-[12px]
              w-[796px]
              h-[150px]
              mt-[32px]
              "
            >
              <span
                className="
                text-[20px]
                font-semibold
                text-[#8B6FE0]
                mb-[16px]
              "
              >
                What's working well
              </span>
              <div
                className="
                  flex
                  flex-row
                  items-center
                  mt-[16px]
                "
              >
                <GoCheckCircleFill
                  className="
                  text-[#AC95F4]
                "
                  size={24}
                />
                <p
                  className="
                  text-[#AC95F4]
                  text-[14px]
                  ml-[8px]
                  "
                >
                  Creates strong curiosity from the first words
                </p>
              </div>
              <div
                className="
                  flex
                  flex-row
                  items-center
                  mt-[16px]
                "
              >
                <GoCheckCircleFill
                  className="
                  text-[#AC95F4]
                "
                  size={24}
                />
                <p
                  className="
                  text-[#AC95F4]
                  text-[14px]
                  ml-[8px]
                  "
                >
                  Clear and easy to understand
                </p>
              </div>
            </div>
            <div
              className="
              bg-[#FEF9F3]
              p-[16px]
              rounded-[12px]
              w-[796px]
              h-[150px]
              mt-[32px]
              "
            >
              <span
                className="
                text-[20px]
                font-semibold
                text-[#FF4902]
                mb-[16px]
              "
              >
                What could be Better
              </span>
              <div
                className="
                  flex
                  flex-row
                  items-center
                  mt-[16px]
                "
              >
                <GoCheckCircleFill
                  className="
                  text-[#FF804F]
                "
                  size={24}
                />
                <p
                  className="
                  text-[#FF804F]
                  text-[14px]
                  ml-[8px]
                  "
                >
                  Add a stronger emotional trigger
                </p>
              </div>
              <div
                className="
                  flex
                  flex-row
                  items-center
                  mt-[16px]
                "
              >
                <GoCheckCircleFill
                  className="
                  text-[#FF804F]
                "
                  size={24}
                />
                <p
                  className="
                  text-[#FF804F]
                  text-[14px]
                  ml-[8px]
                  "
                >
                  Make the outcome feel more valuable
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="
            flex
            flex-col
            gap-[16px]
          "
        >
          <div
            className="
      bg-white
      w-[700px]
      h-[258px]
      p-[16px]
      rounded-[12px]
    "
          >
            <span
              className="
        text-[20px]
        font-medium
        "
            >
              CTR Prediction
            </span>
            <div
              className="
        flex
        flex-row
      "
            >
              <CTRChart value={ctrPrediction} label={ctrStyle.label} />
              <div
                className="
          flex
          flex-col

        "
              >
                <p
                  className="
            text-[16px]
            text-[#848484]
          "
                >
                  This title and thumbnail combination shows strong
                  <br />
                  click-through potential with clear messaging and
                  <br />
                  an attention-grabbing visual.
                </p>
                <div
                  className="
                  flex
                  flex-row
          bg-[#ECF7EC]
          border
          w-[178px]
          h-[44px]
          rounded-[4px]
          mt-[32px]
        "
                >
                  <HiOutlineArrowUpRight
                    className="
                    mt-[8px]
                    ml-[8px]
                      text-[#608B4D]
                      w-[24px]
                      h-[24px]
                      shrink-0
                    "
                  />
                  <p
                    className="
                    mt-[8px]
                    ml-[8px]
                    text-[#608B4D]
                    text-[16px]
                    font-semibold
                    "
                  >
                    Typical: 2% - 6%
                  </p>
                </div>
              </div>
            </div>
          </div>
          {scores.map(({ label, value }) => {
            const scoreStyle = getPredictorScoreStyle(value)

            return (
              <div
                key={label}
                className="
                  flex
                  flex-col
                  bg-white
                  w-[700px]
                  h-[228px]
                  p-[16px]
                  rounded-[12px]
                "
              >
                <span
                  className="
                    text-[20px]
                    font-medium
                  "
                >
                  {label}
                </span>
                <div
                  className="
                    flex
                    flex-row
                  "
                >
                  <span
                    className="
                    text-[48px]
                    mt-[16px]
                  "
                  >
                    {value}
                  </span>
                  <div
                    className="
                      w-[70px]
                      h-[36px]
                      rounded-[4px]
                      ml-[8px]
                      mt-[36px]
                    "
                    style={{ backgroundColor: scoreStyle.bgColor }}
                  >
                    <span
                      className="
                        text-[15px]
                        px-[8px]
                      "
                      style={{ color: scoreStyle.textColor }}
                    >
                      {scoreStyle.label}
                    </span>
                  </div>
                </div>
                <BarGauge
                  value={value}
                  segments={[{ upTo: 100, color: scoreStyle.barColor }]}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
    </div>

  )
}

export default Predicted