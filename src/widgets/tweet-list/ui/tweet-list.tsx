import React, { FC } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ITweet } from '../../../entities/tweet/types/Tweet.interface'
import { Tweet } from '../../../entities/tweet/ui/tweet'

interface TweetListProps {
  tweets: ITweet[]
  deleteTweet?: (id: string) => void
}

const TweetList: FC<TweetListProps> = ({ tweets, deleteTweet }) => {
  const sortTweetDate = (first: ITweet, second: ITweet): number => {
    const firstDate =
      typeof first.createdAt === 'string'
        ? new Date(first.createdAt)
        : first.createdAt
    const secondDate =
      typeof second.createdAt === 'string'
        ? new Date(second.createdAt)
        : second.createdAt

    return new Date(secondDate).getTime() - new Date(firstDate).getTime()
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
