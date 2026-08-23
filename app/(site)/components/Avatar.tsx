interface AvatarProps {
  src: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  className
}) => {
  return (
    <img src={src} alt='Avatar' className={className} />
  )
}

export default Avatar