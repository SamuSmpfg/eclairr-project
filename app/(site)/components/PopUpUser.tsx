'use client'

import { useState } from "react"
import { IoClose } from "react-icons/io5"
import Button from "./Button"
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary'
import { useAuth } from "./AuthContext"

interface User {
  _id: string
  name: string
  email: string
  avatar?: string
}

interface UserPopUpProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

const UserPopUp: React.FC<UserPopUpProps> = ({ isOpen, onClose, user }) => {
  const { updateUser } = useAuth()
  const [avatar, setAvatar] = useState(user.avatar)

  if (!isOpen) return null

  const handleUpload = async (result: CldUploadWidgetResults) => {
    if (result.event !== "success") return

    const info = result.info
    if (!info || typeof info === "string") return

    const secureUrl = (info as { secure_url: string }).secure_url

    setAvatar(secureUrl)

    try {
      const response = await fetch(`http://localhost:3001/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: secureUrl }),
      })

      if (!response.ok) {
        setAvatar(user.avatar)
        return
      }

      updateUser({ avatar: secureUrl })
    } catch {
      setAvatar(user.avatar)
    }
  }

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

        <img
          src={avatar || "/placeholder.jpeg"}
          alt={user.name}
          className="
            w-[88px]
            h-[88px]
            rounded-full
            object-cover
            border-[3px]
            border-[#f2f2f2]
            shadow-sm
          "
        />

        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="iq8frvca"
          className="
            mt-3
            text-[13px]
            font-medium
            text-[#848484]
            hover:text-black
            transition
          "
        >
          Change avatar
        </CldUploadButton>

        <div
          className="
            flex
            flex-col
            items-center
            gap-1
            mt-6
            w-full
          "
        >
          <h2
            className="
              text-[20px]
              font-semibold
              text-[#1a1a1a]
              text-center
            "
          >
            {user.name}
          </h2>
          <p
            className="
              text-[14px]
              text-[#848484]
              text-center
              break-all
            "
          >
            {user.email}
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

export default UserPopUp