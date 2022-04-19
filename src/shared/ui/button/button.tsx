import React, {FC} from "react";
import cn from 'classnames';
import CircleProgress from "../circle-progress/circle-progress";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonType?: 'primary' | 'outline';
    isLoading?: boolean
}

const Button: FC<ButtonProps> = (
    {
        buttonType = 'primary',
        isLoading = false,
        ...props
    }) => {

    // todo Переделать на компонент спиннер (класс loading)
    return (
        <button
            {...props}
            className={cn("button button--primary", props.className)}
            disabled={props.disabled}>
            {!isLoading && <span>{props.children}</span>}
            {isLoading && <CircleProgress size={17} strokeWidth={2} rotate={true} />}
        </button>
    )
}

export default Button