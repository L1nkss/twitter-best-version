import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import React, {FC} from "react";
import {Tweet} from "../../../entities/tweet/ui/tweet";
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface TweetListProps {
    tweets: ITweet[]
}

const TweetList: FC<TweetListProps> = ({tweets}) => {
    const sortTweetDate = (first: ITweet, second: ITweet): number => {
        const firstDate = typeof first.createdAt === 'string' ? new Date(first.createdAt) : first.createdAt;
        const secondDate = typeof second.createdAt === 'string' ? new Date(second.createdAt) : second.createdAt;

        return new Date(secondDate).getTime() - new Date(firstDate).getTime();
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
            {tweets.sort(sortTweetDate).map((tweet) =>
                <CSSTransition key={tweet.id} timeout={700} classNames="tweet">
                    <Tweet key={tweet.id} {...tweet} />
                </CSSTransition>
            )}
        </TransitionGroup>
    )
}

export {TweetList}