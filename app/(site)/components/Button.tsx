'use client'

import { forwardRef } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string
  href?: string
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(({
  children,
  onClick,
  className,
  href
}, ref) => {
  const router = useRouter()
  const handleClick = () => {
    onClick?.()
    if (href) {
      router.push(href)
    }
  }
  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  )
})

Button.displayName = 'Button'

export default Button