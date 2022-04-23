import React from "react";


export type ButtonType = 'primary' | 'outline';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonType?: ButtonType;
    isLoading?: boolean
}