import {FC, useEffect, useRef, useState} from "react";
import cn from "classnames";

interface TwitterTextAreaProps {
    placeholder?: string;
    onChangeHandler?: (...rest: any) => any;
    classes?: string
}

const TwitterTextArea: FC<TwitterTextAreaProps> = (
    {
        placeholder = 'What`s happening?',
        onChangeHandler = () => {},
        classes = ''
    }: TwitterTextAreaProps) => {
    const [value, setValue] = useState<string>('');
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
    const textareaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowPlaceholder(!Boolean(value))
    }, [value])

    const changeHandler = () => {
        if (textareaRef.current) {
            setValue(textareaRef.current.innerText);

            onChangeHandler(textareaRef.current.innerText);
        }
    }

    return (
        <div className={cn("twitter-textarea", classes)}>
            {showPlaceholder && <div className="twitter-textarea__placeholder">{placeholder}</div>}
            <div
                ref={textareaRef}
                contentEditable="true"
                className="twitter-textarea__text w-full"
                onInput={changeHandler}
            />
        </div>
    )
}

export default TwitterTextArea;