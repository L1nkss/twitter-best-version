import React, { FC } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState } from '@app/store'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'

const Profile: FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className="profile">
      <PageHeader pageName={user.name}>
        <Button
          className="mr-3"
          onClick={() => navigate(-1)}
          buttonType="outline"
        >
          <Icon name="arrow-left-svg" />
        </Button>
      </PageHeader>

      <div className="profile__header">
        <div className="profile__user-background"></div>
        <div className="profile__user-data">
          <UserAvatar
            size="xl"
            classes="profile__user-avatar"
            avatarUrl={user.avatarUrl}
          />
        </div>
      </div>
    </div>
  )
}

export { Profile }
