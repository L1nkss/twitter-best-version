import React, {FC} from "react";
import cn from 'classnames';
import Spinner from "../spinner/spinner";

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

    return (
        <button
            {...props}
            className={cn("button button--primary", props.className)}
            disabled={props.disabled}>
            {!isLoading && <span>{props.children}</span>}
            {isLoading && <Spinner strokeWidth={2} className="rotating" />}
        </button>
    )
}

export default Button