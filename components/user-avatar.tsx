import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

type UserAvatarProps = {
  src?: string,
  className?: string,
}

const UserAvatar = ({
  src,
  className
}: UserAvatarProps) => {
  return (
    <Avatar className={cn("w-7 h-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}

export default UserAvatar