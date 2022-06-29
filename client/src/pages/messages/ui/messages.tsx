import { FC, useEffect, useState } from 'react'

import cn from 'classnames';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@app/store';
import { ChatControl } from '@entities/chat-control/ui/chat-control';
import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { contactsSelector } from '@features/contacts/contactsSelector';
import { addContact } from '@features/contacts/contactsSlice';
import { Contact } from '@features/contacts/models/interfaces/Contacts.interface';
import { getAllRoomsSelector } from '@features/messages/messagesSelector';
import { addMessage } from '@features/messages/messagesSlice';
import { ChatMessage } from '@features/messages/models/interfaces/Messages.interface';
import { userSelector } from '@features/user/userSelector';
import { KeyboardCodes } from '@shared/models/enums/keys.enum';
import { Button } from '@shared/ui/button/button';
import { Icon } from '@shared/ui/icon/icon';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { makeRandomString } from '@shared/utils/makeRandomString';
import { socket } from '@shared/utils/socket';

const Messages: FC = () => {
  const [ activeChat, setActiveChat ] = useState<Contact | null>();
  const [ messages, setMessages ] = useState<any[]>([]);
  const [ users, setUsers ] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  const contacts = useSelector(contactsSelector)
  const user = useSelector(userSelector);
  // const userMessages = useSelector(messagesSelector);
  const userRooms = useSelector(getAllRoomsSelector);

  const handleEscButton = (evt: KeyboardEvent) => {
    if (KeyboardCodes.ESC === evt.code) {
      setActiveChat(null);
    }
  }

  const handleUserCardClick = (userInfo: Contact) => {
    setActiveChat(userInfo)
    console.log('')
    // Подключаемся к комнате с пользователем
    if (userInfo.roomId) {
      socket.emit('join', userInfo.roomId, user.uid);
    }

  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscButton);

    socket.on('private message', ({message, roomId}: {message: ChatMessage, roomId: string}) => {
      // const hasUserInChats = users.findIndex((u) => u.id === from.id);
      //
      // if (hasUserInChats === -1) {
      //   dispatch(addContact({id: from.id, name: from.name, avatarUrl: from.avatarUrl, roomId: ''}))
      // }

      // message: {
      //   content: response.message,
      //     from: response.from,
      //     timestamp: response.timestamp,
      //     id: uuid()
      // },
      // roomId: response.to.roomId,


      // content: payload.message.content,
      //   from: payload.message.from,
      //   timestamp: payload.message.timestamp,
      //   id: payload.message.id

      dispatch(addMessage({
        roomId: roomId,
        message
      }))

      setMessages((currentMessages) => [...currentMessages, message])

      // todo неправильны айди. Наверно нужна комната для каждого приватного чата
      // dispatch(addMessage({
      //   roomId: 'test', // или юзер?
      //   message: {
      //     content: message,
      //     from: {
      //       id: from.id,
      //       name: from.name,
      //       avatarUrl: from.avatarUrl
      //     },
      //     timestamp: timestamp
      //   }
      // }))
    })

    return () => {
      window.removeEventListener('keydown', handleEscButton)
    }
  }, [])

  useEffect(() => {
    const chatWithUser = userRooms.find((room) => room.roomId === activeChat?.roomId);

    if (chatWithUser) {
      setMessages(chatWithUser.messages);
    }
    // const chat = userMessages.findIndex((id) => id.userId === activeChat?.id);
    //
    // if (chat !== -1) {
    //   setMessages((prev) => {
    //     return [ ...prev, ...userMessages[chat].messages ]
    //   });
    // }
  }, [ activeChat ])

  const handleButtonClick = (message: string) => {
    const timestamp = new Date().toString();

    if (activeChat) {
      socket.emit('private message',
        {
          message,
          to: activeChat,
          timestamp: timestamp,
          from: {
            id: user.uid,
            name: user.nickName,
            avatarUrl: user.avatarUrl
          }
        })

      const newMessage = {
        content: message,
        id: makeRandomString(10),
        from: {
          id: user.uid,
          name: user.nickName,
          avatarUrl: user.avatarUrl
        },
        timestamp: timestamp
      }

      dispatch(addMessage({
        roomId: activeChat.roomId,
        message:  newMessage
      }))

      setMessages((currentMessages) => [...currentMessages, newMessage])
    }
  }

  const NoActiveChat = (): JSX.Element => {
    return (
      <div>
        <Icon name="new-chat-svg"/>
        Select a chat to start messaging
      </div>
    )
  }

  const ActiveChat = (): JSX.Element => {
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

  return (
    <>
      <PageHeader pageName={ 'Messages Page' }/>
      {/*  Разметка чата  */}
      <div className="grid grid-cols-12 flex-1">
        <div className="message__chats col-span-4">
          {contacts.map((data) => {
            return <UserMessageCard
              key={ data.id }
              avatarUrl={ data.avatarUrl }
              message={ '' }
              name={ data.name }
              isOnline={ false }
              onClick={ () => handleUserCardClick(data) }
            />
          })}
        </div>
        <div className={ cn('col-span-8 px-2 message__active-chat', {'flex items-center justify-center': !activeChat}) }>
          {!activeChat && <NoActiveChat/>}
          {activeChat && <ActiveChat/>}
        </div>
      </div>
    </>
  )
}

export { Messages }
