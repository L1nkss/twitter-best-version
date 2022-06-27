import { FC } from 'react';

import { MessageProps } from '@pages/messages/models/interfaces/Message.interface';
import { UserAvatar } from '@shared/ui/user-avatar/user-avatar';


const UserMessageCard: FC<MessageProps> = ({message, name, isOnline}) => {
  return (
    <div className="user-message-card py-4 px-2">
      <div className="grid grid-cols-6">
        <div className="col-span-1 relative">
          <UserAvatar/>
          {isOnline &&
            <span
              className="bottom-1 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"
            />
          }
        </div>
        <div className="col-span-5">
          <h3 className="mb-2">{name}</h3>
          <p className="overflow-hidden truncate">{message}</p>
        </div>
      </div>
    </div>
  )
}

export { UserMessageCard }