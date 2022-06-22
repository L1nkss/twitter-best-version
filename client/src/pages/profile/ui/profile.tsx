import React, { FC, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { User } from '@features/user/models/User.interface'
import { useHasUserAccess } from '@shared/hooks/useHasUserAccess'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { Loader } from '@shared/ui/loader/loader'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'

import { getFromDataFromFirestore } from '../../../firebase'

const Profile: FC = () => {
  const [user, setUser] = useState<User>()
  const { id } = useParams()
  const navigate = useNavigate()
  const hasAccess = useHasUserAccess(user?.uid)

  // Получение не по ID, а по нику ?
  const getUserProfile = async (
    userNick: string
  ): Promise<User | undefined> => {
    try {
      return await getFromDataFromFirestore<User>(
          'users',
          userNick,
          'nickName'
      )
    } catch (e) {}
  }

  useEffect(() => {
    if (id) {
      getUserProfile(id).then((response) => {
        if (response) {
          setUser(response)
        }
      })
    }
  }, [id])

  if (!user) {
    return <Loader />
  }

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
        <div className="profile__user-background" />
        <div className="profile__user-data">
          <div>
            <UserAvatar
              size="xl"
              classes="profile__user-avatar"
              avatarUrl={user.avatarUrl}
            />

            {hasAccess && <Button>Edit profile</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Profile }