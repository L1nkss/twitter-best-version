import TwitterTextArea from "../../../shared/ui/twitter-textarea/twitter-textarea";
import React, {useEffect, useState} from "react";
import {TweetLength} from "./models/TweetLength.enum";
import Button from "../../../shared/ui/button/button";
import cn from "classnames";
import ProgressBar from "../../../shared/ui/progress-bar/progress-bar";
import {ProgressBarState} from "./models/ProgressBar.interface";

const MakeTweet = () => {
    const SYMBOL_MAX_LENGTH = 50;

    const [value, setValue] = useState<number>(0);
    const [progressBar, setProgressBar] = useState<ProgressBarState>({hideCircles: false, lengthStatus: 'GOOD'})
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isTweetCreating, setIsTweetCreating] = useState<boolean>(false)

    useEffect(() => {
        const symbolsLeft = SYMBOL_MAX_LENGTH - value;

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
        setValue(value.length);
        getPercentage();
    }

    const getPercentage = (): number => {
        return value * 100 / SYMBOL_MAX_LENGTH
    }

    const getProgressBarValue = (): number | undefined => {
        return progressBar.lengthStatus === TweetLength.GOOD ? undefined : SYMBOL_MAX_LENGTH - value
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
            setTimeout(() => {
                setIsTweetCreating(false);
            }, 3000)
        } catch (err) {

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