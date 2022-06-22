import React, { FC } from 'react'


import {likedTweets} from '@features/tweets/tweetsSelectors';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'
import {useSelector} from 'react-redux';

const Bookmarks: FC = () => {
  const list = useSelector(likedTweets)

  return (
    <div>
      <PageHeader pageName={'Bookmarks Page'} />
      <TweetList tweets={list} />
    </div>
  )
}

export { Bookmarks }