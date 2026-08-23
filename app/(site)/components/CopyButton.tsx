"use client"

import { useState } from "react"
import { FiClipboard, FiCheck } from "react-icons/fi"
import Button from "./Button"
import { CopyToClipboard } from "./CopyToClipboard"

type CopyButtonProps = {
  textRef: React.RefObject<HTMLElement>
}

const CopyButton = ({ textRef }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = textRef.current?.textContent ?? ""
    if (!text) return

    await CopyToClipboard(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button
      onClick={handleCopy}
      className="
        flex
        flex-row
        bg-white
        border
        rounded-full
        p-[4px]
        w-[76px]
        h-[31px]
        ml-[8px]
        items-center
        justify-center
        hover:cursor-pointer
        hover:scale-110
        transition
      "
    >
      {copied ? (
        <>
          <FiCheck size={16} className="text-[#608B4D]" />
          <span className="text-[14px] ml-[4px] text-[#608B4D]">copied</span>
        </>
      ) : (
        <>
          <FiClipboard size={16} />
          <span className="text-[14px] ml-[4px]">copy</span>
        </>
      )}
    </Button>
  )
}

export default CopyButton