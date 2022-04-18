import {FC} from "react";

interface CircleProgressProps {
    size?: number;
    strokeWidth?: number;
    percentage: number;
    color?: string;
    label?: string | number
}

const CircleProgress: FC<CircleProgressProps> = (
    {
        size = 30,
        strokeWidth = 3,
        color = 'green',
        percentage,
        label = ''
    }: CircleProgressProps
) => {
    const viewBox = `0 0 ${size} ${size}`;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2; // длина окружности
    const dash = (percentage * circumference) / 100;

    return (
        <svg width={size} height={size} viewBox={viewBox}>
            <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                fill="none"
                stroke={color}
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
                    fill="black"
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