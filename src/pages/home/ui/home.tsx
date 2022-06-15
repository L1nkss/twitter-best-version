import React, { FC, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '@app/store'
import { MakeTweet } from '@entities/make-tweet/ui/make-tweet'
import { loadTweets } from '@features/tweets/thunks/load-tweets'
import { allTweets } from '@features/tweets/tweetsSelectors'
import { userSelector } from '@features/user/userSelector'

import { Loader } from '@shared/ui/loader/loader'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { Context } from '@widgets/context/ui/context'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

const Home: FC = () => {
  const user = useSelector(userSelector)
  const dispatch = useDispatch<AppDispatch>()
  const { loading, list } = useSelector(allTweets)

  const getTweets = async () => {
    await dispatch(loadTweets())
  }

  useEffect(() => {
    // setTweets(data)

    getTweets()
  }, [])

  const deleteTweet = (id: string): void => {
    // const idx = tweets.findIndex((tweet) => tweet.id === id)
    // setTweets((state) => [...state.slice(0, idx), ...state.slice(idx + 1)])
  }

  const likeTweet = async (
    id: string,
    isAlreadyLiked: boolean
  ): Promise<void> => {
    // const idx = tweets.findIndex((tweet) => tweet.id === id)
    // const tweetByIdx = tweets[idx]
    // const likeCount = isAlreadyLiked
    //   ? tweetByIdx.tweetInfo.likes - 1
    //   : tweetByIdx.tweetInfo.likes + 1
    // const updatedTweet: ITweet = {
    //   ...tweetByIdx,
    //   tweetInfo: { ...tweetByIdx.tweetInfo, likes: likeCount },
    // }
    // const userLocalstorage = JSON.parse(
    //   localStorage.getItem('userTwitterData') || ''
    // )
    //
    // try {
    //   const response = await apiClient.put<ITweet>(
    //     `/Tweet/${id}`,
    //     updatedTweet,
    //     { withCredentials: false }
    //   )
    //
    //   if (response.status === 200) {
    //     // Нужно ли новый массив и объект?
    //     if (isAlreadyLiked) {
    //       const userLikedTweetId = userLocalstorage.likedTweets.findIndex(
    //         (twId: string) => twId === id
    //       )
    //       userLocalstorage.likedTweets = [
    //         ...userLocalstorage.likedTweets.slice(0, userLikedTweetId),
    //         ...userLocalstorage.likedTweets.slice(userLikedTweetId + 1),
    //       ]
    //     } else {
    //       userLocalstorage.likedTweets.push(updatedTweet.id)
    //     }
    //   }
    //
    //   const userResponse = await apiClient.put(
    //     `/User/${userLocalstorage.id}`,
    //     userLocalstorage,
    //     { withCredentials: false }
    //   )
    // if (userResponse.status === 200) {
    //   localStorage.setItem(
    //     'userTwitterData',
    //     JSON.stringify(userLocalstorage)
    //   )
    //   setTweets((state) => [
    //     ...state.slice(0, idx),
    //     updatedTweet,
    //     ...state.slice(idx + 1),
    //   ])
    // }
    // } catch (e) {
    //   console.log('e', e)
    // } finally {
    // }
  }

  return (
    <div className="home-page">
      <PageHeader pageName={'Home'} classNames={'home-page__header'} />

      <Context.Provider value={{ likeTweet }}>
        <div className="flex p-4 home-page__twit-form">
          <UserAvatar classes="mr-3" avatarUrl={user.avatarUrl} />
          <MakeTweet />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <TweetList tweets={list} deleteTweet={deleteTweet} />
        )}
      </Context.Provider>
    </div>
  )
}

export { Home }
