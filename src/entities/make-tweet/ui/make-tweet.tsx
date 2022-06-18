import React, { FC, useEffect, useState } from 'react'

import cn from 'classnames'

import { useSelector } from 'react-redux'

import {useAppDispatch} from '@app/store'
import { TweetLength } from '@entities/make-tweet/models/enums/TweetLength.enum'
import { MakeTweetProps } from '@entities/make-tweet/models/interfaces/MakeTweet.interface'
import { ProgressBarState } from '@entities/make-tweet/models/interfaces/ProgressBar.interface'

import { Tweet } from '@features/tweets/models/Tweets.interface'
import { addTweet } from '@features/tweets/thunks/add-tweet'
import { userSelector } from '@features/user/userSelector'
import { Button } from '@shared/ui/button/button'
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar'
import { TwitterTextarea } from '@shared/ui/twitter-textarea/twitter-textarea'

const MakeTweet: FC<MakeTweetProps> = () => {
  const SYMBOL_MAX_LENGTH = 50

  const [value, setValue] = useState<string>('')
  const [progressBar, setProgressBar] = useState<ProgressBarState>({
    hideCircles: false,
    lengthStatus: 'GOOD',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [isTweetCreating, setIsTweetCreating] = useState<boolean>(false)
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const symbolsLeft = SYMBOL_MAX_LENGTH - value.length

    if (symbolsLeft > 20) {
      setProgressBar((state) => ({ ...state, lengthStatus: TweetLength.GOOD }))
    } else if (symbolsLeft <= 20 && symbolsLeft > 0) {
      setProgressBar((state) => ({
        ...state,
        lengthStatus: TweetLength.WARNING,
      }))
    } else {
      setProgressBar((state) => ({
        ...state,
        lengthStatus: TweetLength.DANGER,
      }))
    }

    setIsButtonDisabled(symbolsLeft < 0 || !value)
    setProgressBar((state) => ({ ...state, hideCircles: symbolsLeft < -50 }))
  }, [value])

  const getPercentage = (): number => {
    return (value.length * 100) / SYMBOL_MAX_LENGTH
  }

  const onChange = (twValue: string): void => {
    setValue(twValue)
    getPercentage()
  }

  const getProgressBarValue = (): number | undefined => {
    return progressBar.lengthStatus === TweetLength.GOOD
      ? undefined
      : SYMBOL_MAX_LENGTH - value.length
  }

  const getProgressBarClasses = () => {
    return {
      'spinner--hide-circles': progressBar.hideCircles,
      'progress-bar--warning': progressBar.lengthStatus === TweetLength.WARNING,
      'progress-bar--error': progressBar.lengthStatus === TweetLength.DANGER,
    }
  }

  const createTweet = async () => {
    setIsTweetCreating(true)

    try {
      const data: Omit<Tweet, 'id'> = {
        createdAt: new Date(),
        content: value,
        userInfo: {
          uid: user.uid,
          nickName: user.nickName,
          isVerify: user.isVerify,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        tweetInfo: {
          comments: 0,
          likes: 0,
          retweets: 0,
        },
      }

      await dispatch(addTweet(data))
      setValue('')
    } catch (err) {
      console.log('error', err)
    } finally {
      setIsTweetCreating(false)
    }
  }

  return (
    <div className="w-full make-tweet">
      <TwitterTextarea
        value={value}
        onChangeHandler={onChange}
        classes={'make-tweet__textarea mb-3'}
      />
      <div className="flex items-center justify-end">
        {!!value && (
          <ProgressBar
            percentage={getPercentage()}
            textValue={getProgressBarValue()}
            size={30}
            strokeWidth={3}
            className={cn('mr-3', getProgressBarClasses())}
          />
        )}

        <Button
          onClick={createTweet}
          disabled={isButtonDisabled}
          isLoading={isTweetCreating}
        >
          Tweet
        </Button>
      </div>
    </div>
  )
}

export { MakeTweet }
