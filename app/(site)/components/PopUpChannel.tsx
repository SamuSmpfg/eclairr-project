'use client'

import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import Button from "./Button"
import { useAuth } from "./AuthContext"

interface ChannelData {
  channel: string
  videosPublished: number
}

interface PopUpProps {
  isOpen: boolean
  onClose: () => void
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [channelData, setChannelData] = useState<ChannelData | null>(null)

  useEffect(() => {
    if (!isOpen || !user) return

    Promise.all([
      fetch(`http://localhost:3001/user/${user._id}`).then((res) => res.json()),
      fetch(`http://localhost:3001/videosPublished?user=${user._id}`).then((res) => res.json()),
    ])
      .then(([userData, videosData]) => {
        if (!userData.error && userData.user) {
          setChannelData({
            channel: userData.user.channel,
            videosPublished: videosData.error ? 0 : videosData.videosPublished.length,
          })
        }
      })
      .catch((err) => console.error('Erro ao buscar dados do canal:', err))
  }, [isOpen, user])

  if (!isOpen || !user) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        justify-center
        items-center
        bg-[rgba(0,0,0,0.4)]
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          flex-col
          items-center
          bg-white
          w-[340px]
          rounded-[20px]
          shadow-xl
          px-8
          py-10
        "
      >
        <Button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            bg-[#f2f2f2]
            hover:bg-[#e4e4e4]
            transition
          "
        >
          <IoClose className="text-[#848484] text-[20px]" />
        </Button>

        <h2
          className="
            text-[20px]
            font-semibold
            text-[#1a1a1a]
            text-center
          "
        >
          {user.name} Channel
        </h2>

        <div
          className="
            w-full
            h-[1px]
            bg-[#f2f2f2]
            my-6
          "
        />

        <div
          className="
            flex
            flex-col
            gap-3
            w-full
          "
        >
          <p
            className="
              text-[14px]
              text-[#848484]
            "
          >
            Channel Name: {channelData?.channel ?? '...'}
          </p>
          <p
            className="
              text-[14px]
              text-[#848484]
            "
          >
            Email: {user.email}
          </p>
          <p
            className="
              text-[14px]
              text-[#848484]
            "
          >
            Videos Published: {channelData?.videosPublished ?? '...'}
          </p>
        </div>

        <div
          className="
            w-full
            h-[1px]
            bg-[#f2f2f2]
            my-6
          "
        />

        <Button
          onClick={onClose}
          className="
            w-full
            bg-[#FFA37B]
            border
            border-[#f28759]
            border-[3px]
            text-white
            text-[14px]
            font-medium
            rounded-full
            py-3
            hover:scale-[1.02]
            transition
          "
        >
          <p
            className="
              font-semibold
              px-[110px]
            "
          >
            Close
          </p>
        </Button>
      </div>
    </div>
  )
}

export default PopUp