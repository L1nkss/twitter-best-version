import { FC } from 'react'

import cn from 'classnames'

import { UserAvatarProps } from '@shared/ui/user-avatar/models/interfaces/UserAvatar.interface'

const UserAvatar: FC<UserAvatarProps> = ({
  classes = '',
  avatarUrl,
  onClick,
  size,
}: UserAvatarProps) => {
  return (
    <div
      className={cn(
        'user-avatar',
        `${size && `user-avatar--${size}`}`,
        classes
      )}
      onClick={onClick}
    >
      <img src={avatarUrl} alt="" />
    </div>
  )
}

export { UserAvatar }
