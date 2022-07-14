import { FC, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@app/store';
import { ChatControl } from '@entities/chat-control/ui/chat-control';
import { ChatProps } from '@entities/chat/models/interfaces/Chat.interface';
import { getAllRoomsSelector } from '@features/messages/messagesSelector';
import { addMessage } from '@features/messages/messagesSlice';
import { ChatMessage } from '@features/messages/models/interfaces/Messages.interface';
import { userSelector } from '@features/user/userSelector';
import { makeRandomString } from '@shared/utils/makeRandomString';
import { socket } from '@shared/utils/socket';

const Chat: FC<ChatProps> = ({activeChat}) => {
  const [ messages, setMessages ] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const userRooms = useSelector(getAllRoomsSelector);

  useEffect(() => {
    const chatWithUser = userRooms.find((room) => room.roomId === activeChat?.roomId);

    if (chatWithUser) {
      setMessages(chatWithUser.messages);
    }

    socket.on('private message', ({message, roomId}: {message: ChatMessage, roomId: string}) => {
      dispatch(addMessage({
        roomId: roomId,
        message
      }))

      if (roomId === activeChat?.roomId) {
        setMessages((currentMessages) => [...currentMessages, message])
      }
    })
  }, [])

  const handleButtonClick = (message: string) => {
    const timestamp = new Date().toString();

    if (activeChat) {
      const from = {
        id: user.uid,
        name: user.nickName,
        avatarUrl: user.avatarUrl
      }
      socket.emit('private message',
        {
          message,
          to: activeChat,
          timestamp: timestamp,
          from
        })

      const newMessage = {
        content: message,
        id: makeRandomString(10),
        from,
        timestamp: timestamp
      }

      dispatch(addMessage({
        roomId: activeChat.roomId,
        message:  newMessage
      }))

      setMessages((currentMessages) => [...currentMessages, newMessage])
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {messages.map((m) => {
          return <div key={ m.id }>{m.content}</div>
        })}
      </div>
      <ChatControl onButtonClickHandler={ handleButtonClick } />
    </div>
  )
}

export {Chat}