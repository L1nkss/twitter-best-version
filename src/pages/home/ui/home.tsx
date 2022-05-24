import { TweetList } from "../../../widgets";
import { PageHeader, Spinner, useFetch, UserAvatar } from "../../../shared";
import { ITweet } from "../../../entities/tweet/types/Tweet.interface";
import React, { useEffect, useState } from "react";
import { Context } from "../../../widgets";
import axios from "axios";
import { MakeTweet } from "../../../entities";

const Home = () => {
  const [isLoading, data] = useFetch<ITweet[]>(
    "https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet",
    []
  );
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const userData = JSON.parse(localStorage.getItem("userTwitterData") || "");

  useEffect(() => {
    setTweets(data);
  }, [data]);

  const getLoadingComponent = (): React.ReactElement => {
    return (
      <div className="flex justify-center pt-5">
        <Spinner size={40} strokeWidth={4} className="rotating" />
      </div>
    );
  };

  const addNewTweet = (tweet: ITweet): void => {
    setTweets((state) => [...state, tweet]);
  };

  const deleteTweet = (id: string): void => {
    const idx = tweets.findIndex((tweet) => tweet.id === id);
    setTweets((state) => [...state.slice(0, idx), ...state.slice(idx + 1)]);
  };

  const likeTweet = async (
    id: string,
    isAlreadyLiked: boolean
  ): Promise<any> => {
    const idx = tweets.findIndex((tweet) => tweet.id === id);
    const tweetByIdx = tweets[idx];
    const likeCount = isAlreadyLiked
      ? tweetByIdx.tweetInfo.likes - 1
      : tweetByIdx.tweetInfo.likes + 1;
    const updatedTweet: ITweet = {
      ...tweetByIdx,
      tweetInfo: { ...tweetByIdx.tweetInfo, likes: likeCount },
    };
    const userData = JSON.parse(localStorage.getItem("userTwitterData") || "");

    try {
      const response = await axios.put<ITweet>(
        `https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet/${id}`,
        updatedTweet,
        { withCredentials: false }
      );

      if (response.status === 200) {
        // Нужно ли новый массив и объект?
        if (isAlreadyLiked) {
          const userLikedTweetId = userData.likedTweets.findIndex(
            (twId: string) => twId === id
          );
          userData.likedTweets = [
            ...userData.likedTweets.slice(0, userLikedTweetId),
            ...userData.likedTweets.slice(userLikedTweetId + 1),
          ];
        } else {
          userData.likedTweets.push(updatedTweet.id);
        }
      }

      const userResponse = await axios.put(
        `https://62657cf194374a2c5070d523.mockapi.io/api/v1/User/${userData.id}`,
        userData,
        { withCredentials: false }
      );

      if (userResponse.status === 200) {
        localStorage.setItem("userTwitterData", JSON.stringify(userData));
        setTweets((state) => [
          ...state.slice(0, idx),
          updatedTweet,
          ...state.slice(idx + 1),
        ]);
      }
    } catch (e) {
      console.log("e", e);
    } finally {
    }
  };

  return (
    <div className="home-page">
      <PageHeader pageName={"Home"} classNames={"home-page__header"} />

      <Context.Provider value={{ likeTweet }}>
        <div className="flex p-4 home-page__twit-form">
          <UserAvatar classes="mr-3" avatarUrl={userData.avatarUrl} />
          <MakeTweet addNewTweet={addNewTweet} />
        </div>
        {isLoading ? (
          getLoadingComponent()
        ) : (
          <TweetList tweets={tweets} deleteTweet={deleteTweet} />
        )}
      </Context.Provider>
    </div>
  );
};

export { Home };
