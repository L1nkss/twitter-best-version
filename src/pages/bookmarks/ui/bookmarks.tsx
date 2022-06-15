import React, { FC } from 'react'

import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'
import { useFetch } from '@shared/hooks/useFetch'
import { Loader } from '@shared/ui/loader/loader'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

const Bookmarks: FC = () => {
  const userData = JSON.parse(localStorage.getItem('userTwitterData') || '')
  const [isLoading, data] = useFetch<ITweet[]>(
    `https://62657cf194374a2c5070d523.mockapi.io/api/v1/User/${userData.id}/LikedTweets`,
    []
  )

  return (
    <div>
      <PageHeader pageName={'Bookmarks Page'} />
      {isLoading ? <Loader /> : <TweetList tweets={data} />}
    </div>
  )
}

export { Bookmarks }
