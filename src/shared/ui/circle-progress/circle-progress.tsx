import {FC, ReactElement} from "react";
import Spinner, {SpinnerProps} from "../spinner/spinner";

interface CircleProgressProps extends SpinnerProps {
    textColor?: string
    textValue?: number | string
}

const CircleProgress: FC<CircleProgressProps> = (
    {
        percentage = 25,
        textColor = '#1DA1F2',
        textValue,
        ...props
    }: CircleProgressProps
) => {

    const getTextValue = (): ReactElement | undefined => {
        if (!textValue) return undefined

        return <text
            fill={textColor}
            fontSize="10px"
            x="50%"
            y="50%"
            dy="4px"
            textAnchor="middle"
        >
            {`${textValue}`}
        </text>
    }

    return (
        <Spinner {...props} percentage={percentage}>
            {getTextValue()}
        </Spinner>
    )
}

export default CircleProgress