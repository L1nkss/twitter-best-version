import React, { FC, useEffect, useState } from 'react'

import axios from 'axios'
import cn from 'classnames'

import { Button, ProgressBar, TwitterTextArea } from '../../../shared'
import { ITweet } from '../../tweet/types/Tweet.interface'
import { ProgressBarState, TweetLength } from '../models'

// Возможно неправильно
interface MakeTweetProps {
  addNewTweet?: (tweet: ITweet) => void
}

const MakeTweet: FC<MakeTweetProps> = ({ addNewTweet }) => {
  const SYMBOL_MAX_LENGTH = 50

  const [value, setValue] = useState<string>('')
  const [progressBar, setProgressBar] = useState<ProgressBarState>({
    hideCircles: false,
    lengthStatus: 'GOOD',
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [isTweetCreating, setIsTweetCreating] = useState<boolean>(false)
  const userData = JSON.parse(localStorage.getItem('userTwitterData') || '')

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
      const response = await axios.post<ITweet>(
        'https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet',
        {
          createdAt: new Date(),
          content: value,
          userInfo: {
            userName: userData.userName,
            isVerify: true,
            name: userData.name,
            avatarUrl: userData.avatarUrl,
          },
          tweetInfo: {
            comments: 0,
            likes: 0,
            retweets: 0,
          },
        }
      )

      if (response.status === 201 && addNewTweet) {
        addNewTweet(response.data)
        setValue(() => '')
      }
    } catch (err) {
      console.log('error', err)
    } finally {
      setIsTweetCreating(false)
    }
  }

  return (
    <div className="w-full make-tweet">
      <TwitterTextArea
        value={value}
        onChangeHandler={onChange}
        classes={'make-tweet__textarea'}
      />
      <div>
        <div className="flex items-center justify-end">
          {!!value && (
            <ProgressBar
              percentage={getPercentage()}
              textValue={getProgressBarValue()}
              size={30}
              strokeWidth={3}
              className={cn(getProgressBarClasses())}
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
    </div>
  )
}

export { MakeTweet }
