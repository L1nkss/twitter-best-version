import React, {FC, useEffect} from 'react'

import {useSelector} from 'react-redux'

import {useAppDispatch} from '@app/store'
import {MakeTweet} from '@entities/make-tweet/ui/make-tweet'
import {loadLikesTweets} from '@features/tweets/thunks/load-likes-tweets';
import {loadTweets} from '@features/tweets/thunks/load-tweets'
import {allTweets} from '@features/tweets/tweetsSelectors'
import {userSelector} from '@features/user/userSelector'

import {Loader} from '@shared/ui/loader/loader'
import {PageHeader} from '@shared/ui/page-header/page-header'
import {UserAvatar} from '@shared/ui/user-avatar/user-avatar'
import {TweetList} from '@widgets/tweet-list/ui/tweet-list'

const Home: FC = () => {
    const user = useSelector(userSelector)
    const dispatch = useAppDispatch();
    const {loading, list} = useSelector(allTweets)

    const getTweets = async () => {
        await dispatch(loadTweets())
    }

    const loadLikedTweets = async (id: string) => {
        await dispatch(loadLikesTweets(id));
    }

    useEffect(() => {
        getTweets();
        loadLikedTweets(user.uid);
    }, [])

    return (
        <div className="home-page">
            <PageHeader pageName={'Home'} classNames={'home-page__header'}/>

            <div className="flex p-4 home-page__twit-form">
                <UserAvatar classes="mr-3" avatarUrl={user.avatarUrl}/>
                <MakeTweet/>
            </div>
            {loading ? (
                <Loader/>
            ) : (
                <TweetList tweets={list}/>
            )}
        </div>
    )
}

export {Home}
