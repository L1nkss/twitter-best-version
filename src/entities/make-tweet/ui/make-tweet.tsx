import TwitterTextArea from "../../../shared/ui/twitter-textarea/twitter-textarea";
import React, {useEffect, useState} from "react";
import {TweetLength} from "./models/TweetLength.enum";
import Button from "../../../shared/ui/button/button";
import cn from "classnames";
import ProgressBar from "../../../shared/ui/progress-bar/progress-bar";
import {ProgressBarState} from "./models/ProgressBar.interface";
import axios from "axios";
import {ITweet} from "../../tweet/types/Tweet.interface";

const MakeTweet = () => {
    const SYMBOL_MAX_LENGTH = 50;

    const [value, setValue] = useState<string>('');
    const [progressBar, setProgressBar] = useState<ProgressBarState>({hideCircles: false, lengthStatus: 'GOOD'})
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isTweetCreating, setIsTweetCreating] = useState<boolean>(false)

    useEffect(() => {
        const symbolsLeft = SYMBOL_MAX_LENGTH - value.length;

        if (symbolsLeft > 20) {
            setProgressBar((state) => ({...state, lengthStatus: TweetLength.GOOD}));
        } else if (symbolsLeft <= 20 && symbolsLeft > 0) {
            setProgressBar((state) => ({...state, lengthStatus: TweetLength.WARNING}));
        } else {
            setProgressBar((state) => ({...state, lengthStatus: TweetLength.DANGER}));
        }

        setIsButtonDisabled(symbolsLeft < 0 || !value);
        setProgressBar((state) => ({...state, hideCircles: symbolsLeft < -50}));

    }, [value])

    const onChange = (value: string): void => {
        setValue(value);
        getPercentage();
    }

    const getPercentage = (): number => {
        return value.length * 100 / SYMBOL_MAX_LENGTH
    }

    const getProgressBarValue = (): number | undefined => {
        return progressBar.lengthStatus === TweetLength.GOOD ? undefined : SYMBOL_MAX_LENGTH - value.length
    }

    const getProgressBarClasses = () => {
        return {
            'spinner--hide-circles': progressBar.hideCircles,
            'progress-bar--warning': progressBar.lengthStatus === TweetLength.WARNING,
            'progress-bar--error': progressBar.lengthStatus === TweetLength.DANGER,
        }
    }

    const createTweet = async () => {
        setIsTweetCreating(true);
        // Какая то логика создания твита
        try {
            const response = await axios.post<ITweet>('https://62657cf194374a2c5070d523.mockapi.io/api/v1/Tweet', {
                createdAt: new Date(),
                content: value,
                userInfo: {
                    userName: 'L1nksss',
                    isVerify: true,
                    name: "Sergey Kharlov"
                },
                tweetInfo: {
                    comments: 0,
                    likes: 0,
                    retweets: 0,
                }
            })
            console.log('RESPONSE', response)
            // setTimeout(() => {
            //     setIsTweetCreating(false);
            // }, 3000)
        } catch (err) {
            console.log('error', err)
        } finally {
            setIsTweetCreating(false)
        }
    }

    return (
        <div className="w-full make-tweet">
            <TwitterTextArea onChangeHandler={onChange} classes={'make-tweet__textarea'} />
            <div>
                <div className="flex items-center justify-end">
                    {
                        !!value && <ProgressBar
                            percentage={getPercentage()}
                            textValue={getProgressBarValue()}
                            size={30}
                            strokeWidth={3}
                            className={cn(getProgressBarClasses())}
                        />
                    }

                    <Button onClick={createTweet} disabled={isButtonDisabled} isLoading={isTweetCreating}>Tweet</Button>
                </div>
            </div>
        </div>
    )
}

export default MakeTweet