import React, { FC, useEffect, useState } from 'react'

import { collection, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@app/store'
import { MakeTweet } from '@entities/make-tweet/ui/make-tweet'
import { loadLikesTweets } from '@features/tweets/thunks/load-likes-tweets';
import { loadTweets } from '@features/tweets/thunks/load-tweets'
import { allTweetsSelector } from '@features/tweets/tweetsSelectors'
import { userSelector } from '@features/user/userSelector'

import { Loader } from '@shared/ui/loader/loader'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

import { firebaseDB } from '../../../firebase';

const Home: FC = () => {
    const [ newTweetsCount, setNewTweetsCount ] = useState<number>(0);
    const user = useSelector(userSelector)
    const dispatch = useAppDispatch();
    const {loading, list} = useSelector(allTweetsSelector)

    const getTweets = async () => {
        await dispatch(loadTweets())
    }

    const loadLikedTweets = async (id: string) => {
        await dispatch(loadLikesTweets(id));
    }

    useEffect(() => {
        onSnapshot(collection(firebaseDB, 'tweets'), (updatedDocs) => {
            if (updatedDocs.size > list.length) {
                setNewTweetsCount(updatedDocs.size - list.length);
            } else {
                setNewTweetsCount(0);
            }
        })
    }, [ list ])

    useEffect(() => {
        getTweets();
        loadLikedTweets(user.uid);
    }, [])

    return (
        <div className="home-page">
            <PageHeader pageName={ 'Home' } classNames={ 'home-page__header' }/>

            <div className="flex p-4 home-page__twit-form">
                <UserAvatar classes="mr-3" avatarUrl={ user.avatarUrl }/>
                <MakeTweet/>
            </div>
            {Boolean(newTweetsCount) && <div className="home-page__extra-tweets"
                                             onClick={ () => getTweets() }>Show {newTweetsCount} tweets.</div>}
            {loading ? (
                <Loader/>
            ) : (
                <TweetList tweets={ list }/>
            )}
        </div>
    )
}

export { Home }
