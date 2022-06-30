import React, { FC, useEffect, useState } from 'react'

import cn from 'classnames';
import { useSelector } from 'react-redux';

import { Chat } from '@entities/chat/ui/chat';
import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { contactsSelector } from '@features/contacts/contactsSelector';
import { Contact } from '@features/contacts/models/interfaces/Contacts.interface';
import { userSelector } from '@features/user/userSelector';
import { KeyboardCodes } from '@shared/models/enums/keys.enum';
import { Icon } from '@shared/ui/icon/icon';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { socket } from '@shared/utils/socket';

const Messages: FC = () => {
  const [ activeChat, setActiveChat ] = useState<Contact | null>();

  const contacts = useSelector(contactsSelector)
  const user = useSelector(userSelector);

  const handleUserCardClick = (userInfo: Contact) => {
    setActiveChat(userInfo)
    // Подключаемся к комнате с пользователем
    if (userInfo.roomId) {
      socket.emit('join', userInfo.roomId, user.uid);
    }
  }

  const handleEscButton = (evt: KeyboardEvent) => {
    if (KeyboardCodes.ESC === evt.code) {
      setActiveChat(null);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscButton);

    return () => {
      window.removeEventListener('keydown', handleEscButton)
    }
  }, [])

  const NoActiveChat = (): JSX.Element => {
    return (
      <div>
        <Icon name="new-chat-svg"/>
        Select a chat to start messaging
      </div>
    )
  }

  return (
    <>
      <PageHeader pageName={ 'Messages Page' }/>
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
          {activeChat ? <Chat activeChat={ activeChat } /> : <NoActiveChat />}
        </div>
      </div>
    </>
  )
}

export { Messages }
