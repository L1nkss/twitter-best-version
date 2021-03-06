import { FC, useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@app/store';
import { Comments } from '@entities/tweet/ui/components/comments/comments';
import { Likes } from '@entities/tweet/ui/components/likes/likes';
import { Retweets } from '@entities/tweet/ui/components/retweets/retweets';
import { Share } from '@entities/tweet/ui/components/share/share';
import { addNotification } from '@features/notifications/notificationsSlice';
import { ChangesEnum } from '@features/tweets/models/enums/ChangesEnums.enum';
import { Tweet as ITweet } from '@features/tweets/models/interfaces/Tweets.interface'
import { deleteTweet } from '@features/tweets/thunks/delete-tweet';
import { likeStatus } from '@features/tweets/thunks/like-status';
import { likedTweetsSelector } from '@features/tweets/tweetsSelectors';
import { userIdSelector } from '@features/user/userSelector';
import { useHasUserAccess } from '@shared/hooks/useHasUserAccess'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { Popup } from '@shared/ui/popup/popup'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { getTimeSince } from '@shared/utils/date-activity'


const Tweet: FC<ITweet> = (props) => {
  const [ isTweetLiked, setIsTweetLiked ] = useState<boolean>(false)
  const [ popupVisible, setPopupVisible ] = useState<boolean>(false)
  const navigate = useNavigate()
  const hasAccess = useHasUserAccess(props.userInfo.uid)
  const dispatch = useAppDispatch();
  const userLikedTweets = useSelector(likedTweetsSelector);
  const currentUserId = useSelector(userIdSelector);

  useEffect(() => {
    const idx = userLikedTweets.findIndex((tw) => tw.id === props.id);

    setIsTweetLiked(idx !== -1);
  }, [ userLikedTweets ])

  const likeTweetClickHandler = async () => {
    try {
      const updatedLikeCounter = isTweetLiked ? props.tweetInfo.likes - 1 : props.tweetInfo.likes + 1;
      const updatedTweet = {...props, tweetInfo: {...props.tweetInfo, likes: updatedLikeCounter}};
      await dispatch(likeStatus({
        tweet: updatedTweet,
        status: isTweetLiked ? ChangesEnum.DELETE : ChangesEnum.ADD,
        currentUserId
      }));
    } catch (e) {

    }
  }

  const linkToProfile = (): void => {
    navigate(`../${props.userInfo.nickName}`)
  }

  const deleteCurrentTweet = async (id: string): Promise<void> => {
    setPopupVisible(false);

    try {
      await dispatch(deleteTweet(id))
    } catch (err) {
      dispatch(addNotification({type: 'error', title: 'Error', description: '???????????? ?????? ?????????????? ???? ????????????'}))
    }
  }

  return (
    <div className="flex tweet p-4">
      <UserAvatar
        avatarUrl={ props.userInfo.avatarUrl }
        classes="mr-3"
        onClick={ linkToProfile }
      />

      <div className="w-full">
        <div className="flex items-center">
          <h2 className="font-bold mr-1">{props.userInfo.name}</h2>
          {props.userInfo.isVerify && <Icon name="verify-svg" classNames="mr-1"/>}
          <p className="tweet__header-data mr-1">@{props.userInfo.nickName}</p>
          <p className="tweet__header-data">
            <time>{getTimeSince(props.createdAt)}</time>
          </p>
          {hasAccess && (
            <div className="ml-auto tweet__button">
              <button onClick={ () => setPopupVisible(true) }>??????????????</button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <p>{props.content}</p>
        </div>

        <div className="flex justify-between tweet__action mt-3">
          <Comments counter={ props.tweetInfo.comments } onClick={ () => {
          } }/>
          <Retweets counter={ props.tweetInfo.retweets } onClick={ () => {
          } }/>
          <Likes counter={ props.tweetInfo.likes } onClick={ likeTweetClickHandler } isLiked={ isTweetLiked }/>
          <Share onClick={ () => {
          } }/>
        </div>
      </div>

      <Popup onClose={ setPopupVisible } isVisible={ popupVisible } title="">
        <h2>Delete tweet?</h2>
        <p className="mb-3">
          This can`t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </p>

        <Button
          className="w-full mb-3"
          buttonType="outline"
          onClick={ () => deleteCurrentTweet(props.id) }
        >
          Delete
        </Button>

        <Button
          className="w-full"
          buttonType="outline"
          onClick={ () => setPopupVisible(false) }
        >
          Cancel
        </Button>
      </Popup>
    </div>
  )
}

export { Tweet }
