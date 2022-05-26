import { FC } from 'react'

import cn from 'classnames'

import { UserAvatarProps } from '@shared/ui/user-avatar/models/interfaces/UserAvatar.interface'

const UserAvatar: FC<UserAvatarProps> = ({
  classes = '',
  avatarUrl,
}: UserAvatarProps) => {
  return (
    <div className={cn('user-avatar', classes)}>
      <img src={avatarUrl} alt="" />
    </div>
  )
}

export { UserAvatar }
