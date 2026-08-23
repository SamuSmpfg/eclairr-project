'use client'

import { useRef } from "react"
import { ImQuotesLeft } from "react-icons/im"
import CopyButton from "../../components/CopyButton"

interface RewriteSuggestionCardProps {
  text: string
  score: number
}

const RewriteSuggestionCard = ({ text, score }: RewriteSuggestionCardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null)

  return (
    <div
      className="
        flex
        flex-row
        items-center
        justify-between
        bg-[#F5F4FB]
        rounded-[12px]
        py-[4px]
        px-[8px]
        w-[821px]
        h-[72px]
        hover:scale-105
        transition
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          min-w-0
          pr-[16px]
        "
      >
        <ImQuotesLeft className="mx-[8px] flex-shrink-0" />
        <p
          ref={textRef}
          className="
            text-[15px]
            font-medium
            truncate
          "
        >
          {text}
        </p>
      </div>
      <div
        className="
          flex
          flex-row
          items-center
          flex-shrink-0
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            bg-[#ECF7EC]
            border
            border-[#608B4D]
            rounded-full
            px-[4px]
            w-[76px]
            h-[31px]
            mr-[8px]
          "
        >
          <span className="text-[#608B4D] text-[14px]">
            score: {score}
          </span>
        </div>
        <CopyButton textRef={textRef} />
      </div>
    </div>
  )
}

export default RewriteSuggestionCard