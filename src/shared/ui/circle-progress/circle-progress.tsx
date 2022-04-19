import {FC} from "react";
import cn from "classnames";

interface CircleProgressProps {
    size?: number;
    strokeWidth?: number;
    percentage?: number;
    color?: string;
    label?: string | number;
    isCirclesVisible?: boolean;
    rotate?: boolean
}

const CircleProgress: FC<CircleProgressProps> = (
    {
        size = 30,
        strokeWidth = 3,
        color = '#1D9BF0',
        percentage = 25,
        label = '',
        isCirclesVisible = true,
        rotate

    }: CircleProgressProps
) => {
    const viewBox = `0 0 ${size} ${size}`;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2; // длина окружности
    const dash = (percentage * circumference) / 100;


    const getCircleStroke = (color: string): string => {
        return isCirclesVisible ? color : 'transparent';
    }

    return (
        <svg width={size} height={size} viewBox={viewBox} className={cn({'rotating': rotate})}>
            <circle
                fill="none"
                stroke={getCircleStroke('#ccc')}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                fill="none"
                stroke={getCircleStroke(color)}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                strokeDasharray={`${dash} ${circumference - dash}`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeLinecap="round"
            />
            {!!label &&
                <text
                    fill={color}
                    fontSize="10px"
                    x="50%"
                    y="50%"
                    dy="4px"
                    textAnchor="middle"
                >
                    {`${label}`}
                </text>
            }
        </svg>
    )
}

export default CircleProgress