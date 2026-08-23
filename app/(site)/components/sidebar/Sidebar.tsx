'use client'

import { usePathname, useRouter } from "next/navigation"
import { LuClapperboard, LuCompass } from "react-icons/lu"
import Button from "../Button"
import { HiHome } from "react-icons/hi"
import { PiMagicWand } from "react-icons/pi"
import { TbSettings2 } from "react-icons/tb"

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const isHomeActive = pathname === '/'
  const isCompassActive = pathname === '/search' || pathname.startsWith('/analized')
  const isMagicWandActive = pathname.startsWith('/scorer')
  const isClapperActive = pathname === '/predictSearch' || pathname.startsWith('/predicted')
  const isGearActive = pathname === '/settings'

  const handleCompassClick = () => {
    const last = sessionStorage.getItem('lastSearchRoute')
    router.push(last || '/search')
  }

  const handleMagicWandClick = () => {
    const last = sessionStorage.getItem('lastSearchRoute')
    router.push(last || '/')
  }

  return (
    <div
      className="
        flex
        flex-direction-col
        justify-between
        items-center
        w-[48px]
        h-[780px]
        mt-[24px]
        mb-[16px]
      "
    >
      <div className="">

        <Button
          onClick={() => { }}
          href='/'
          className={`
          rounded-full
          flex
          pr-1
          pl-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[48px] 
          h-[48px]
          items-center
          justify-center
          ${isHomeActive ? 'bg-black' : 'bg-[#EAE9EF]'}
          `}
        >

          <span>
            <HiHome className={isHomeActive ? 'text-white' : 'text-[#848484]'} size={24} />
          </span>
        </Button>
        <div className="h-[16px]" />
        <Button
          onClick={handleCompassClick}
          className={`
          rounded-full
          flex
          pr-1
          pl-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[48px] 
          h-[48px]
          items-center
          justify-center
          ${isCompassActive ? 'bg-black' : 'bg-[#EAE9EF]'}
          `}
        >

          <span>
            <LuCompass className={isCompassActive ? 'text-white' : 'text-[#848484]'} size={24} />
          </span>
        </Button>
        <div className="h-[16px]" />
        <Button
          onClick={handleMagicWandClick}
          href="/scorerSearch"
          className={`
          rounded-full
          bg-[#EAE9EF]
          flex
          pr-1
          pl-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[48px] 
          h-[48px]
          items-center
          justify-center
          ${isMagicWandActive ? 'bg-black' : 'bg-[#EAE9EF]'}
          `
          }
        >

          <span>
            <PiMagicWand className={isMagicWandActive ? 'text-white' : 'text-[#848484]'} size={24} />
          </span>
        </Button>

        <div className="h-[16px]" />
        <Button
          onClick={() => { }}
          href="/predictSearch"
          className={`
          rounded-full
          bg-[#EAE9EF]
          flex
          pr-1
          pl-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[48px] 
          h-[48px]
          items-center
          justify-center
          ${isClapperActive ? 'bg-black' : 'bg-[#EAE9EF]'}
          `}
        >

          <span>
            <LuClapperboard className={isClapperActive ? 'text-white' : 'text-[#848484]'} size={24} />
          </span>
        </Button>
        <div className="h-[16px]" />
        <div>
          <Button
            onClick={() => { }}
            href="/settings"
            className={`
          rounded-full
          bg-[#EAE9EF]
          flex
          pr-1
          pl-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[48px] 
          h-[48px]
          items-center
          justify-center
          ${isGearActive ? 'bg-black' : 'bg-[#EAE9EF]'}
            `}
          >

            <span>
              <TbSettings2 className={isGearActive ? 'text-white' : 'text-[#848484]'} size={24} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar