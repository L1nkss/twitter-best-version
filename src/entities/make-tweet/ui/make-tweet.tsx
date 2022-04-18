import TwitterTextArea from "../../../shared/ui/twitter-textarea/twitter-textarea";
import {useEffect, useState} from "react";
import CircleProgress from "../../../shared/ui/circle-progress/circle-progress";
import {TweetLengthEnum} from "./models/TweetLength.enum";

const MakeTweet = () => {
    const SYMBOL_MAX_LENGTH = 50;

    const [value, setValue] = useState<number>(0);
    const [progressBarColor, setProgressBarColor] = useState<TweetLengthEnum>(TweetLengthEnum.GOOD);
    const [isCirclesVisible, setIsCirclesVisible] = useState<boolean>(true);

    useEffect(() => {
        const symbolsLeft = SYMBOL_MAX_LENGTH - value;

        if (symbolsLeft > 20) {
            setProgressBarColor(TweetLengthEnum.GOOD);
        } else if (symbolsLeft <= 20 && symbolsLeft > 0) {
            setProgressBarColor(TweetLengthEnum.WARNING)
        } else {
            setProgressBarColor(TweetLengthEnum.DANGER);
            setIsCirclesVisible(symbolsLeft > -50);
        }

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

    return (
        <div className="w-full">
            <TwitterTextArea onChangeHandler={onChange} />
            <div style={{margin: '30px'}}>
                {!!value &&
                <CircleProgress
                    percentage={getPercentage()}
                    color={progressBarColor}
                    label={getProgressLabel()}
                    isCirclesVisible={isCirclesVisible}
                />}
            </div>
        </div>
    )
}

export default MakeTweet