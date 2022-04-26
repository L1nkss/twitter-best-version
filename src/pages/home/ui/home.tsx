import PageHeader from "../../../shared/ui/page-header/page-header";
import {TweetList} from "../../../widgets/tweet-list/ui/tweet-list";
import {useFetch} from "../../../shared/hooks/useFetch";
import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import React, {useEffect, useState} from "react";
import Spinner from "../../../shared/ui/spinner/spinner";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";
import MakeTweet from "../../../entities/make-tweet/ui/make-tweet";

const Home = () => {
    const [isLoading, data] = useFetch<ITweet[]>("https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet", []);
    const [tweets, setTweets] = useState<ITweet[]>([]);

    useEffect(() => {
        setTweets(data);
    }, [data])

    const getLoadingComponent = (): React.ReactElement => {
        return (
            <div className="flex justify-center pt-5">
                <Spinner size={40} strokeWidth={4} className="rotating"/>
            </div>
        )
    }

    const addNewTweet = (tweet: ITweet): void => {
        setTweets((state) => [...state, tweet]);
    }

    return (
        <div className="home-page">
            <PageHeader pageName={'Home'} classNames={'home-page__header'} />
            <div className="flex p-4 home-page__twit-form">
                <UserAvatar classes="mr-3" />
                <MakeTweet addNewTweet={addNewTweet} />
            </div>
            { isLoading ? getLoadingComponent() : <TweetList tweets={tweets} />}
        </div>
    )
}

export default Home;