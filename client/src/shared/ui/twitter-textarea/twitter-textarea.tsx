import { FC, useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import { TwitterTextareaProps } from '@shared/ui/twitter-textarea/models/interfaces/TwitterTextarea.interface'

const TwitterTextarea: FC<TwitterTextareaProps> = ({
  placeholder = 'What`s happening?',
  onChangeHandler = () => {
  },
  classes = '',
  value,
}: TwitterTextareaProps) => {
  const [ showPlaceholder, setShowPlaceholder ] = useState<boolean>(true)
  const textareaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowPlaceholder(!Boolean(value))

    if (!value && textareaRef.current) {
      textareaRef.current.innerText = ''
    }
  }, [ value ])

  const changeHandler = () => {
    if (textareaRef.current) {
      onChangeHandler(textareaRef.current.innerText)
    }
  }

  return (
    <div className={ cn('twitter-textarea', classes) }>
      {showPlaceholder && (
        <div className="twitter-textarea__placeholder">{placeholder}</div>
      )}
      <div
        ref={ textareaRef }
        contentEditable="true"
        className="twitter-textarea__text w-full"
        onInput={ changeHandler }
      />
    </div>
  )
}

export { TwitterTextarea }
