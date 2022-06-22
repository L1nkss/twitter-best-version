import React, { FC } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Tweet } from '@entities/tweet/ui/tweet'
import { Tweet as ITweet } from '@features//tweets/models/Tweets.interface'
import { getDate } from '@shared/utils/date'
import { TweetListProps } from '@widgets/tweet-list/models/interfaces/TweetList.interface'

const TweetList: FC<TweetListProps> = ({ tweets }) => {
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
      {tweets
        .slice()
        .sort(sortTweetDate)
        .map((tweet) => (
          <CSSTransition key={tweet.id} timeout={700} classNames="tweet">
            <Tweet key={tweet.id} {...tweet} />
          </CSSTransition>
        ))}
    </TransitionGroup>
  )
}

export { TweetList }