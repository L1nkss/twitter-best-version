import { FC, useState } from 'react';

import { ChatControlProps } from '@entities/chat-control/ui/models/interfaces/ChatControl.interface';
import { Button } from '@shared/ui/button/button';

const ChatControl: FC<ChatControlProps> = ({onButtonClickHandler}) => {
  const [input, setInput] = useState<string>('');

  const handleInputChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <input
          value={ input }
          className="w-full"
          type="text"
          style={ {border: '1px solid black'} }
          onChange={ handleInputChanges }
        />
      </div>
      <Button iconName="telegram-svg" onClick={ () => onButtonClickHandler(input) }/>
    </div>
  )
}

export {ChatControl}