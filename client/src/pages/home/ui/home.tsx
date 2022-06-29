import React, { FC, useEffect, useState } from 'react'

import { collection, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@app/store'
import { MakeTweet } from '@entities/make-tweet/ui/make-tweet'
import { addContact } from '@features/contacts/contactsSlice';
import { Contact } from '@features/contacts/models/interfaces/Contacts.interface';
import { loadLikesTweets } from '@features/tweets/thunks/load-likes-tweets';
import { loadTweets } from '@features/tweets/thunks/load-tweets'
import { allTweetsSelector, allTweetsSortedByDateSelector } from '@features/tweets/tweetsSelectors'
import { userSelector } from '@features/user/userSelector'

import { Loader } from '@shared/ui/loader/loader'
import { PageHeader } from '@shared/ui/page-header/page-header'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { makeRandomString } from '@shared/utils/makeRandomString';
import { socket } from '@shared/utils/socket';
import { TweetList } from '@widgets/tweet-list/ui/tweet-list'

import { firebaseDB } from '../../../firebase';

const Home: FC = () => {
  const [ newTweetsCount, setNewTweetsCount ] = useState<number>(0);
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch();
  const {loading} = useSelector(allTweetsSelector);
  const tweets = useSelector(allTweetsSortedByDateSelector);

  const getTweets = async () => {
    await dispatch(loadTweets())
  }

  const loadLikedTweets = async (id: string) => {
    await dispatch(loadLikesTweets(id));
  }

  useEffect(() => {
    onSnapshot(collection(firebaseDB, 'tweets'), (updatedDocs) => {
      if (updatedDocs.size > tweets.length) {
        setNewTweetsCount(updatedDocs.size - tweets.length);
      } else {
        setNewTweetsCount(0);
      }
    })
  }, [ tweets ])

  useEffect(() => {
    socket.auth = {id: user.uid, name: user.nickName, avatarUrl: user.avatarUrl};
    socket.connect();

    socket.on('notify user message', (message) => {
      const newContact: Contact = {
        id: message.id,
        name: message.name,
        avatarUrl: message.avatarUrl,
        roomId: message.roomId
      }

      dispatch(addContact(newContact));
    })

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
        <TweetList tweets={ tweets }/>
      )}
    </div>
  )
}

export { Home }
