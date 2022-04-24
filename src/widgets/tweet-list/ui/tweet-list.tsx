import {useFetch} from "../../../shared/hooks/useFetch";
import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import Spinner from "../../../shared/ui/spinner/spinner";
import React from "react";
import {Tweet} from "../../../entities/tweet/ui/tweet";

const TweetList = () => {
    const [isLoading, data] = useFetch<ITweet[]>("https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet", []);

    const getLoadingComponent = (): React.ReactElement => {
        return (
            <div className="flex justify-center pt-5">
                <Spinner size={40} strokeWidth={4} className="rotating"/>
            </div>
        )
    }

    const getArrayHasItems = (): boolean => {
        return data.length !== 0;
    }

    const sortTweetDate = (first: ITweet, second: ITweet): number => {
        const firstDate = typeof first.createdAt === 'string' ? new Date(first.createdAt) : first.createdAt;
        const secondDate = typeof second.createdAt === 'string' ? new Date(second.createdAt) : second.createdAt;

        return new Date(secondDate).getTime() - new Date(firstDate).getTime();
    }

    const createTweetList = () => {
        if (!getArrayHasItems()) {
            return (
                <div className="flex justify-center pt-5">
                    <h3>Sorry, no tweets :(</h3>
                </div>
            )
        }

        return (
            <div>
                {data.sort(sortTweetDate).map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
            </div>
        )
    }

    return (
        <>
            {isLoading && getLoadingComponent()}
            {!isLoading && createTweetList()}
        </>
    )
}

export {TweetList}