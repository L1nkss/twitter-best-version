import React, { FC, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { IUser } from '@shared/models/interfaces/User.interface'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { Spinner } from '@shared/ui/spinner/spinner'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { apiClient } from '@shared/utils/api-client'

const Profile: FC = () => {
  const [user, setUser] = useState<IUser>()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getUserProfile = async (): Promise<IUser> => {
      try {
        const profile = await apiClient.get(`/User/${id}`)

        return profile.data
      } catch (e) {
        throw e
      }
    }

    getUserProfile().then((response) => {
      setUser(response)
    })
  }, [id])

  if (!user) {
    return (
      <div className="flex justify-center pt-5">
        <Spinner size={40} strokeWidth={4} className="rotating" />
      </div>
    )
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
