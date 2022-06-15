import { FC, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Tweet as ITweet } from '@features/tweets/models/Tweets.interface'
import { useHasUserAccess } from '@shared/hooks/useHasUserAccess'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { Popup } from '@shared/ui/popup/popup'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { apiClient } from '@shared/utils/api-client'
import { getTimeSince } from '@shared/utils/date-activity'

// import { ITweet } from '../models/interfaces/Tweet.interface'

// Выглядит херово
const Tweet: FC<ITweet & { deleteTweet?: (id: string) => void }> = (props) => {
  const [isTweetLiked, setIsTweetLiked] = useState<boolean>(false)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  // const { likeTweet } = useContext(Context)
  const navigate = useNavigate()
  // const userData = JSON.parse(localStorage.getItem('userTwitterData') || '')
  const hasAccess = useHasUserAccess(props.userInfo.uid)

  // const isTweetLiked = (): boolean => {
  //   return (
  //     userData.likedTweets.findIndex((twId: string) => twId === props.id) !== -1
  //   )
  // }

  useEffect(() => {
    // const isUserLikesTweet =
    //   userData.likedTweets.findIndex((twId: string) => twId === props.id) !== -1
    //
    // setIsTweetLiked(isUserLikesTweet)
  }, [])

  const likeTweetClickHandler = () => {
    // Подсчитать новое значение твита + или -
    // Изменить статус like/not like
    setIsTweetLiked((currentValue) => !currentValue)
  }

  const linkToProfile = (): void => {
    navigate(`../${props.userInfo.nickName}`)
  }

  // todo Переделать на Popup с удалением и передачей туда id
  const deleteTweet = async (id: string): Promise<void> => {
    setPopupVisible(false)

    try {
      const response = await apiClient.delete<ITweet>(`/Tweet/${id}`, {
        withCredentials: false,
      })

      if (response.status === 200) {
        if (props.deleteTweet) {
          props.deleteTweet(id)
        }
      }
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <div className="flex tweet p-4">
      <UserAvatar
        avatarUrl={props.userInfo.avatarUrl}
        classes="mr-3"
        onClick={linkToProfile}
      />

      <div className="w-full">
        <div className="flex items-center">
          <h2 className="font-bold mr-1">{props.userInfo.name}</h2>
          {props.userInfo.isVerify && (
            <Icon name="verify-svg" classNames="mr-1" />
          )}
          <p className="tweet__header-data mr-1">@{props.userInfo.nickName}</p>
          <p className="tweet__header-data">
            <time>{getTimeSince(props.createdAt)}</time>
          </p>
          {hasAccess && (
            <div className="ml-auto tweet__button">
              <button onClick={() => setPopupVisible(true)}>Удалить</button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <p>{props.content}</p>
        </div>

        <div className="flex justify-between tweet__action mt-3">
          <div className="flex items-center tweet__action-item tweet__action-item--comment">
            <div className="inline-flex relative mr-2.5">
              <div className="tweet__circle" />
              <Icon name="comment-svg" classNames="tweet__svg" />
            </div>
            {props.tweetInfo.comments !== 0 && (
              <span className="text-xs">{props.tweetInfo.comments}</span>
            )}
          </div>

          <div className="flex items-center tweet__action-item tweet__action-item--retweet">
            <div className="inline-flex relative mr-2.5">
              <div className="tweet__circle" />
              <Icon name="retweet-svg" classNames="tweet__svg" />
            </div>
            {props.tweetInfo.retweets !== 0 && (
              <span className="text-xs">{props.tweetInfo.retweets}</span>
            )}
          </div>

          <div
            className="flex items-center tweet__action-item tweet__action-item--likes"
            onClick={() => likeTweetClickHandler()}
          >
            <div className="inline-flex relative mr-2.5">
              <div className="tweet__circle" />
              {isTweetLiked ? (
                <Icon name="liked-svg" />
              ) : (
                <Icon name="like-svg" classNames="tweet__svg" />
              )}
            </div>
            {props.tweetInfo.likes !== 0 && (
              <span className="text-xs">{props.tweetInfo.likes}</span>
            )}
          </div>

          <div className="flex items-center tweet__action-item  tweet__action-item--share">
            <div className="inline-flex relative mr-2.5">
              <div className="tweet__circle" />
              <Icon name="share-svg" classNames="tweet__svg" />
            </div>
          </div>
        </div>
      </div>

      <Popup onClose={setPopupVisible} isVisible={popupVisible} title="">
        <h2>Delete tweet?</h2>
        <p className="mb-3">
          This can`t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </p>

        <Button
          className="w-full mb-3"
          buttonType="outline"
          onClick={() => deleteTweet(props.id)}
        >
          Delete
        </Button>

        <Button
          className="w-full"
          buttonType="outline"
          onClick={() => setPopupVisible(false)}
        >
          Cancel
        </Button>
      </Popup>
    </div>
  )
}

export { Tweet }
