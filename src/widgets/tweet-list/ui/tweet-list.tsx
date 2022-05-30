import React, { FC } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ITweet } from '@entities/tweet/models/interfaces/Tweet.interface'
import { Tweet } from '@entities/tweet/ui/tweet'
import { getDate } from '@shared/utils/date'
import { TweetListProps } from '@widgets/tweet-list/models/interfaces/TweetList.interface'

const TweetList: FC<TweetListProps> = ({ tweets, deleteTweet }) => {
  const sortTweetDate = (first: ITweet, second: ITweet): number => {
    const firstDate = getDate(first.createdAt)
    const secondDate = getDate(second.createdAt)

    return secondDate.getTime() - firstDate.getTime()
  }

  if (tweets.length === 0) {
    return (
      <div className="flex justify-center pt-5">
        <h3>Sorry, no tweets :(</h3>
      </div>
    )
  }

  return (
    <TransitionGroup component="div" className="overflow-hidden">
      {tweets.sort(sortTweetDate).map((tweet) => (
        <CSSTransition key={tweet.id} timeout={700} classNames="tweet">
          <Tweet key={tweet.id} {...tweet} deleteTweet={deleteTweet} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export { TweetList }
