import React, {FC} from "react";

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
        <button className="button button--primary">
            {props.children}
        </button>
    )
}

export default Button