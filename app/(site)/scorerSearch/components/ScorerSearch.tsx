'use client'

import Button from '../../components/Button'
import InputModal from '../../search/components/InputModal'
import { LiaMicrophoneSolid } from 'react-icons/lia'
import { IoArrowUp } from 'react-icons/io5'
import { PiMagicWand } from 'react-icons/pi'
import { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const ScorerSearch = () => {
  const [text, setText] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.toString()
    sessionStorage.setItem('lastMagicWandRoute', query ? `${pathname}?${query}` : pathname)
  }, [pathname, searchParams])

  useEffect(() => {
    sessionStorage.setItem('ai-entry-topic', text)
  }, [text])

  const handleAddText = (textToAdd: string) => {
    setText(textToAdd)
  }

  const handleAnalyzeHook = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    router.push(`/scorer/${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="flex flex-col items-center mt-[32px]">
      <div className="
        flex
        flex-row
        items-start
        p-[16px]
      ">
        <div className="w-[585px]">
          <h1 className="
            text-[48px]
            tracking-[-2%]
            font-medium
          ">
            Hook Scorer Tool
          </h1>
          <p className="
            text-[24px]
            text-[#848484]
            tracking-[-2%]
            mt-[8px]
            font-light
          ">
            Score any hook idea to predict its viral potential
            before you invest time creating content.
          </p>
        </div>

        <div
          className="
            flex
            bg-[#FFFFFF]/50
            w-[597px]
            h-[188px]
            rounded-[20px]
            p-[16px]
            shadow-md
            ml-[350px]
          "
        >
          <img src="/cardcontainer.jpg" />

          <div className="flex flex-col mt-[32px] ml-[8px]">
            <h1 className="
              text-[24px]
              tracking-[-3%]
              font-medium
            ">
              How it works
            </h1>
            <p
              className="
                font-light
                text-[14px]
                text-[#848484]
                tracking-[-2%]
                mt-[8px]
              "
            >
              Our AI evaluates patterns
              to estimate the viral potential of your hook.
            </p>
          </div>
        </div>
      </div>
      <div className='
        flex
        flex-col
        w-[1029px]
        h-[270px]
        bg-white
        rounded-[21px]
        shadow-xl
        p-[24px]
        mt-[100px]
      '>
        <InputModal value={text} onChange={setText}>
          <div className="flex flex-row justify-between items-start w-full">
            <h2
              className='
        text-[24px]
        tracking-[-2%]
        font-medium 
      '
            >
              Enter a topic to Analyze
            </h2>
          </div>

          <p
            className='
      text-[14px]
      font-medium
      tracking-[-2%]
      text-[#838B8E]
      mt-[4px]
    '
          >
            Describe your next youtube video idea
          </p>
        </InputModal>
        <div className='
          flex flex-row gap-[8px] mt-[8px] items-center justify-end
        '>
          <Button
            onClick={() => { }}
            className='
            relative
            z-10
            text-[#2C2C4C]
            hover:scale-110
            transition
            hover:cursor-pointer
            w-[20px]
            h-[20px]
            mr-[8px]
            '
          >
            <LiaMicrophoneSolid />
          </Button>
          <Button
            onClick={handleAnalyzeHook}
            className='
            relative
            z-10
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-black
    text-white
    text-[16px]
    p-[8px]
    rounded-[8px]
    w-[150px]
    h-[40px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer
        '
          >

            <span>
              Analyze Topic
            </span>
            <IoArrowUp className='w-[20px] h-[20px]' />
          </Button>
        </div>
      </div>
      <div className='
        flex
        flex-row
      '>
        <Button
          onClick={() => handleAddText('I Tested 5 AI Tools for Youtube')}
          className='
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-[#EAE9EF]
    text-[#2C2C4C]
    text-[16px]
    p-[8px]
    mt-[32px]
    rounded-[12px]
    w-[287px]
    h-[51px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer

        '
        >
          <PiMagicWand
            className='
          w-[20px]
          h-[20px]
          mr-[8px]

          '
          />
          <span>
            I Tested 5 Ai Tools for Youtube
          </span>
        </Button>
        <Button
          onClick={() => handleAddText("Why Small Channels don't Grow?")}
          className='
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-[#EAE9EF]
    text-[#2C2C4C]
    text-[16px]
    p-[8px]
    mt-[32px]
    m-[8px]
    rounded-[12px]
    w-[287px]
    h-[51px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer

        '
        >
          <PiMagicWand
            className='
          w-[20px]
          h-[20px]
          mr-[8px]

          '
          />
          <span>
            Why Small Channels don't Grow
          </span>
        </Button>
        <Button
          onClick={() => handleAddText('The Secret to Viral Thumbnails')}
          className='
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-[#EAE9EF]
    text-[#2C2C4C]
    text-[16px]
    p-[8px]
    mt-[32px]
    rounded-[12px]
    w-[287px]
    h-[51px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer

        '
        >
          <PiMagicWand
            className='
          w-[20px]
          h-[20px]
          mr-[8px]

          '
          />
          <span>
            The Secret to Viral Thumbnails
          </span>
        </Button>
      </div>
      <div className='
        flex
      '>
        <Button
          onClick={() => handleAddText('I Tried Youtube Automation')}
          className='
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-[#EAE9EF]
    text-[#2C2C4C]
    text-[16px]
    p-[8px]
    mt-[8px]
    m-[8px]
    rounded-[12px]
    w-[287px]
    h-[51px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer

        '
        >
          <PiMagicWand
            className='
          w-[20px]
          h-[20px]
          mr-[8px]

          '
          />
          <span>
            I Tried Youtube Automation
          </span>
        </Button>
        <Button
          onClick={() => handleAddText('I Tried Youtube Automation')}
          className='
            flex
    flex-row
    items-center
    justify-center
    gap-[4px]
    bg-[#EAE9EF]
    text-[#2C2C4C]
    text-[16px]
    p-[8px]
    mt-[8px]
    m-[8px]
    rounded-[12px]
    w-[287px]
    h-[51px]
    font-medium
    whitespace-nowrap
    hover:scale-110
    transition
    hover:cursor-pointer

        '
        >
          <PiMagicWand
            className='
          w-[20px]
          h-[20px]
          mr-[8px]

          '
          />
          <span>
            I Tried Youtube Automation
          </span>
        </Button>
      </div>
    </div>
  )
}

export default ScorerSearch