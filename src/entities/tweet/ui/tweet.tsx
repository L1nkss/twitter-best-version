import { FC, useContext } from 'react'

import axios from 'axios'

import { Icon } from '@shared/ui/icon/icon'
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar'
import { getTimeSince } from '@shared/utils/date-activity'
import { Context } from '@widgets/context/ui/context'

import { ITweet } from '../models/interfaces/Tweet.interface'

// Выглядит херово
const Tweet: FC<ITweet & { deleteTweet?: (id: string) => void }> = (props) => {
  const { likeTweet } = useContext(Context)
  const userData = JSON.parse(localStorage.getItem('userTwitterData') || '')

  const hasAccessToDelete = (): boolean => {
    return props.userInfo.userName === userData.userName
  }

  const isTweetLiked = (): boolean => {
    return (
      userData.likedTweets.findIndex((twId: string) => twId === props.id) !== -1
    )
  }

  // todo Переделать на Popup с удалением и передачей туда id
  const deleteTweet = async (id: string): Promise<any> => {
    try {
      const response = await axios.delete<ITweet>(
        `https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet/${id}`,
        { withCredentials: false }
      )

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
      <UserAvatar avatarUrl={props.userInfo.avatarUrl} classes="mr-3" />

      <div className="w-full">
        <div className="flex items-end">
          <h2 className="font-bold mr-1">{props.userInfo.name}</h2>
          {/* Иконка если Verify*/}
          <p className="tweet__header-data mr-1">@{props.userInfo.userName}</p>
          <p className="tweet__header-data">
            <time>{getTimeSince(props.createdAt)}</time>
          </p>
          {hasAccessToDelete() && (
            <div className="ml-auto tweet__button">
              <button onClick={() => deleteTweet(props.id)}>Удалить</button>
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
            onClick={() => likeTweet(props.id, isTweetLiked())}
          >
            <div className="inline-flex relative mr-2.5">
              <div className="tweet__circle" />
              {isTweetLiked() ? (
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
    </div>
  )
}

export { Tweet }
