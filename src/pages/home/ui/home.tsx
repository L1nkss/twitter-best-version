import PageHeader from "../../../shared/ui/page-header/page-header";
import {TweetList} from "../../../widgets/tweet-list/ui/tweet-list";
import {useFetch} from "../../../shared/hooks/useFetch";
import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import React, {useEffect, useReducer, useState} from "react";
import Spinner from "../../../shared/ui/spinner/spinner";
import UserAvatar from "../../../shared/ui/user-avatar/user-avatar";
import MakeTweet from "../../../entities/make-tweet/ui/make-tweet";
import {Context} from "../../../widgets/context/ui/context";
import axios from "axios";

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

    const deleteTweet = (id: string): void => {
        const idx = tweets.findIndex((tweet) => tweet.id === id);
        setTweets((state) => [...state.slice(0, idx), ...state.slice(idx + 1)]);
    }

    const likeTweet = async (id: string, isAlreadyLiked: boolean): Promise<any> => {
        const idx = tweets.findIndex((tweet) => tweet.id === id);
        const tweetByIdx = tweets[idx];
        const likeCount = isAlreadyLiked ? tweetByIdx.tweetInfo.likes - 1 : tweetByIdx.tweetInfo.likes + 1;
        const updatedTweet: ITweet = {...tweetByIdx, tweetInfo: {...tweetByIdx.tweetInfo, likes: likeCount}};
        const userData = JSON.parse(localStorage.getItem('userTwitterData') || '');

        try {
            const response = await axios.put<ITweet>(`https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet/${id}`, updatedTweet, {withCredentials: false})

            console.log('userData', userData);
            if (response.status === 200) {

                // Нужно ли новый массив и объект?
                if (isAlreadyLiked) {
                    const userLikedTweetId = userData.likedTweets.findIndex((twId: string) => twId === id);
                    userData.likedTweets = [...userData.likedTweets.slice(0, userLikedTweetId), ...userData.likedTweets.slice(userLikedTweetId + 1)]
                } else {
                    userData.likedTweets.push(id);
                }
                localStorage.setItem('userTwitterData', JSON.stringify(userData))
                setTweets((state) => [...state.slice(0, idx), updatedTweet, ...state.slice(idx + 1)])
            }
        } catch (e) {
            console.log('e', e)
        } finally {

        }
    }

    return (
        <div className="home-page">
            <PageHeader pageName={'Home'} classNames={'home-page__header'} />

            <Context.Provider value={{likeTweet}}>
                <div className="flex p-4 home-page__twit-form">
                    <UserAvatar classes="mr-3" />
                    <MakeTweet addNewTweet={addNewTweet} />
                </div>
                { isLoading ? getLoadingComponent() : <TweetList tweets={tweets} deleteTweet={deleteTweet} />}
            </Context.Provider>
        </div>
    )
}

export default Home;