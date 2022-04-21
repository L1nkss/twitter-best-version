import TwitterTextArea from "../../../shared/ui/twitter-textarea/twitter-textarea";
import React, {useEffect, useState} from "react";
import CircleProgress from "../../../shared/ui/circle-progress/circle-progress";
import {TweetLengthEnum} from "./models/TweetLength.enum";
import Button from "../../../shared/ui/button/button";
import cn from "classnames";

const MakeTweet = () => {
    const SYMBOL_MAX_LENGTH = 50;

    const [value, setValue] = useState<number>(0);
    const [progressBarColor, setProgressBarColor] = useState<TweetLengthEnum>(TweetLengthEnum.GOOD);
    const [hideCircles, setHideCircles] = useState<boolean>(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isTweetCreating, setIsTweetCreating] = useState<boolean>(false)

    useEffect(() => {
        const symbolsLeft = SYMBOL_MAX_LENGTH - value;

        if (symbolsLeft > 20) {
            setProgressBarColor(TweetLengthEnum.GOOD);
        } else if (symbolsLeft <= 20 && symbolsLeft > 0) {
            setProgressBarColor(TweetLengthEnum.WARNING)
        } else {
            setProgressBarColor(TweetLengthEnum.DANGER);
        }

        setIsButtonDisabled(symbolsLeft < 0 || !value);
        setHideCircles(symbolsLeft < -50);

    }, [value])

    const onChange = (value: string): void => {
        setValue(value.length);
        getPercentage();
    }

    const getProgressLabel = (): number | undefined => {
        return progressBarColor === TweetLengthEnum.DANGER ? SYMBOL_MAX_LENGTH - value : undefined;
    }

    const getPercentage = (): number => {
        return value * 100 / SYMBOL_MAX_LENGTH
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
                        !!value && <CircleProgress
                            percentage={getPercentage()}
                            textValue={getProgressLabel()}
                            textColor={progressBarColor}
                            color={progressBarColor}
                            className={cn({'spinner--hide-circles': hideCircles})}
                        />
                    }

                    <Button onClick={createTweet} disabled={isButtonDisabled} isLoading={isTweetCreating}>Tweet</Button>
                </div>
            </div>
        </div>
    )
}

export default MakeTweet