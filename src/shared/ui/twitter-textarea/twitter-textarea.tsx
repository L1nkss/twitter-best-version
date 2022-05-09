import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

interface TwitterTextAreaProps {
  placeholder?: string;
  onChangeHandler?: (...rest: any) => any;
  classes?: string;
  value: string;
}

const TwitterTextArea: FC<TwitterTextAreaProps> = ({
  placeholder = "What`s happening?",
  onChangeHandler = () => {},
  classes = "",
  value,
}: TwitterTextAreaProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
  const textareaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowPlaceholder(!Boolean(value));

    if (!value && textareaRef.current) {
      textareaRef.current.innerText = "";
    }
  }, [value]);

  const changeHandler = () => {
    if (textareaRef.current) {
      onChangeHandler(textareaRef.current.innerText);
    }
  };

  return (
    <div className={cn("twitter-textarea", classes)}>
      {showPlaceholder && (
        <div className="twitter-textarea__placeholder">{placeholder}</div>
      )}
      <div
        ref={textareaRef}
        contentEditable="true"
        className="twitter-textarea__text w-full"
        onInput={changeHandler}
      />
    </div>
  );
};

export default TwitterTextArea;
