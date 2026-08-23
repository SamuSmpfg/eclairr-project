'use client'

import { useState, useEffect } from "react"
import { FaYoutube } from "react-icons/fa"
import Button from "../../../(site)/components/Button"
import { RiAppsFill } from "react-icons/ri"
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md"
import { LuRefreshCcw } from "react-icons/lu"
import Avatar from "../../../(site)/components/Avatar"
import { IoLogInOutline } from "react-icons/io5"
import PopUp from "../../components/PopUpChannel"
import UserPopUp from "../../components/PopUpUser"
import { useAuth } from "../../components/AuthContext"
import { PiMagicWand } from "react-icons/pi"

const LAST_REFRESH_KEY = "lastRefreshTime"

function formatTimeAgo(timestamp: number | null) {
  if (!timestamp) return "..."

  const diffMs = Date.now() - timestamp
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return "right now"
  if (diffMin < 60) return `${diffMin}m ago`

  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

const Header = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isUserPopUpOpen, setIsUserPopUpOpen] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<number | null>(null)
  const [, setTick] = useState(0) // só pra forçar re-render a cada minuto

  const { user, logout } = useAuth()

  const handleLogOut = () => {
    logout()
    window.location.href = 'http://localhost:5173'
  }

  useEffect(() => {
    const stored = localStorage.getItem(LAST_REFRESH_KEY)
    const time = stored ? parseInt(stored, 10) : Date.now()

    if (!stored) {
      localStorage.setItem(LAST_REFRESH_KEY, time.toString())
    }

    setLastRefresh(time)

    // atualiza o texto "Xh atrás" a cada minuto, sem precisar recarregar
    const interval = setInterval(() => setTick((n) => n + 1), 60000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    localStorage.setItem(LAST_REFRESH_KEY, Date.now().toString())
    window.location.reload()
  }

  return (
    <div
      className="
      flex
      mt-[24px]
      h-[68px]
      w-full
      max-w-[1997.305px]
      items-center
      "
    >
      <h2 className="font-medium whitespace-nowrap">
        Logo
      </h2>

      <Button
        onClick={() => { }}
        className="
        flex
        font-extralight
        items-center
        bg-black
        rounded-full
        pr-3
        py-1
        ml-[16px]
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
          <PiMagicWand
            className="
          text-white 
          w-[24px] 
          h-[24px] 
          " />
        </span>

        <span className="text-white justify-center whitespace-nowrap">
          Thumbnail Predictor
        </span>
      </Button>

      <Button
        onClick={() => { }}
        href="/predictSearch"
        className="
        flex
        font-extralight
        items-center
        bg-[#EAE9EF]
        rounded-full
        pr-3
        py-1
        ml-[16px]
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
          <MdKeyboardArrowLeft
            className="
          text-[#848484] 
          w-[24px] 
          h-[24px] 
          " />
        </span>

        <span className="text-[#848484] justify-center whitespace-nowrap">
          Back to Dashboard
        </span>
      </Button>

      <div className="flex-1" />

      <Button
        onClick={() => setIsPopUpOpen(true)}
        className="
        flex
        items-center
        bg-[#eae9ef]
        rounded-full
        pr-3
        py-1
        ml-[16px]
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
          h-8"
        >

          <FaYoutube className="text-red-500 w-[24px] h-[24px] ml-3" />
        </span>
        <span className="text-[#848484] whitespace-nowrap pl-1">
          {user?.name} Channel
        </span>
        <span>
          <MdKeyboardArrowDown className="text-[#848484]" />
        </span>
      </Button>

      <Button
        onClick={handleRefresh}
        className="
        flex
        border
        items-center
        bg-[#eae9ef]
        rounded-full
        pr-3
        py-1
        ml-[16px]
        cursor-pointer
        flex-shrink-0
        hover:cursor-pointer
        hover:scale-110
        transition
        "
      >
        <span className="
        text-[#848484] 
        whitespace-nowrap
        pl-3
         ">
          Refresh: {formatTimeAgo(lastRefresh)}
        </span>
        <span className="
          flex
          items-center
          justify-center
          rounded-lg
          w-8
          h-8">
          <LuRefreshCcw className="text-[#848484] w-[24px] h-[24px] ml-2" />
        </span>
      </Button>

      <div className="w-[16px]" />

      <Button
        onClick={() => setIsUserPopUpOpen(true)}
        className="
          flex
          hover:cursor-pointer
          hover:scale-110
          transition
          rounded-full
        "
      >
        <Avatar src={user?.avatar || "/placeholder.jpeg"} className="rounded-full w-[44px] h-[44px]" />
      </Button>

      {user && (
        <UserPopUp
          isOpen={isUserPopUpOpen}
          onClose={() => setIsUserPopUpOpen(false)}
          user={user}
        />
      )}

      <div className="w-[16px]" />


      <Button
        onClick={() => { }}
        className="
          rounded-full
          bg-black
          flex
          pr-1
          hover:cursor-pointer
          hover:scale-110
          transition
          w-[44px] 
          h-[44px]
          items-center
          justify-center
        "
      >
        <span>
          <IoLogInOutline
            className="text-white"
            size={34}
            onClick={handleLogOut}
          />
        </span>
      </Button>

      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />

    </div>
  )
}

export default Header