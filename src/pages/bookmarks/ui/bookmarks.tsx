import React, { FC } from 'react'

import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'
import { useFetch } from '@shared/hooks/useFetch'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { Spinner } from '@shared/ui/spinner/spinner'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

const Bookmarks: FC = () => {
  const userData = JSON.parse(localStorage.getItem('userTwitterData') || '')
  const [isLoading, data] = useFetch<ITweet[]>(
    `https://62657cf194374a2c5070d523.mockapi.io/api/v1/User/${userData.id}/LikedTweets`,
    []
  )

  const getLoadingComponent = (): React.ReactElement => {
    return (
      <div className="flex justify-center pt-5">
        <Spinner size={40} strokeWidth={4} className="rotating" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader pageName={'Bookmarks Page'} />
      {isLoading ? getLoadingComponent() : <TweetList tweets={data} />}
    </div>
  )
}

export { Bookmarks }
