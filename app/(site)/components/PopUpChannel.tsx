'use client'

import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import Button from "./Button"
import { useAuth } from "./AuthContext"

interface ChannelData {
  channel: string
  videosPublished: number
  subscribers: number
  totalViews: number
}

interface PopUpProps {
  isOpen: boolean
  onClose: () => void
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  const { user, accounts, switchAccount } = useAuth()
  const [channelData, setChannelData] = useState<ChannelData | null>(null)
  const [loginLink, setLoginLink] = useState('')

  useEffect(() => {
  if (!isOpen || !user) return

  fetch(`http://localhost:3001/channel?user=${user._id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('resposta do /channel:', data)
      if (!data.error && data.channels && data.channels[0]) {
        const ch = data.channels[0]
        setChannelData({
          channel: ch.name,
          videosPublished: ch.videosPublished,
          subscribers: ch.subscribers,
          totalViews: ch.totalViews,
        })
      }
    })
    .catch((err) => console.error('Erro ao buscar dados do canal:', err))
}, [isOpen, user])

  useEffect(() => {
    if (!isOpen) return

    fetch('http://localhost:3001/auth/login-link')
      .then((res) => res.json())
      .then((data) => setLoginLink(data.loginLink))
      .catch((err) => console.error('Erro ao buscar link de login:', err))
  }, [isOpen])

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
            flex
            flex-col
            gap-2
            w-full
            mt-4
          "
        >
          {accounts.length > 1 && (
            <>
              <p className="text-[12px] text-[#848484] uppercase tracking-wide">
                Switch account
              </p>
              {accounts.map((account) => (
                <button
                  key={account._id}
                  onClick={() => {
                    setChannelData(null)
                    switchAccount(account._id)
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    w-full
                    text-left
                    px-3
                    py-2
                    rounded-[8px]
                    transition
                    ${account._id === user._id
                      ? 'bg-[#FFF1EA] border border-[#f28759]'
                      : 'hover:bg-[#f6f6f6] border border-transparent'
                    }
                  `}
                >
                  {account.avatar && (
                    <img
                      src={account.avatar}
                      className="w-[28px] h-[28px] rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#1a1a1a] font-medium">
                      {account.name}
                    </span>
                    <span className="text-[11px] text-[#848484]">
                      {account.email}
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}

          <a
            href={loginLink}
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-center
              w-full
              text-[13px]
              font-medium
              text-[#f28759]
              px-3
              py-2
              rounded-[8px]
              border
              border-dashed
              border-[#f28759]
              hover:bg-[#FFF1EA]
              transition
            "
          >
            + Add account
          </a>
        </div>

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
          <div className="flex flex-col gap-3 w-full">
  <p className="text-[14px] text-[#848484]">
    Channel Name: {channelData?.channel ?? '...'}
  </p>
  <p className="text-[14px] text-[#848484]">
    Email: {user.email}
  </p>
  <p className="text-[14px] text-[#848484]">
  Videos Published: {channelData?.videosPublished ?? '...'}
</p>
<p className="text-[14px] text-[#848484]">
  Subscribers: {channelData?.subscribers?.toLocaleString() ?? '...'}
</p>
<p className="text-[14px] text-[#848484]">
  Total Views: {channelData?.totalViews?.toLocaleString() ?? '...'}
</p>
</div>
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