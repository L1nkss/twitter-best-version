import { FC, useEffect, useState } from 'react'

import cn from 'classnames';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@app/store';
import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { contactsSelector } from '@features/contacts/contactsSelector';
import { addContact } from '@features/contacts/contactsSlice';
import { messagesSelector } from '@features/messages/messagesSelector';
import { addMessage } from '@features/messages/messagesSlice';
import { userSelector } from '@features/user/userSelector';
import { KeyboardCodes } from '@shared/models/enums/keys.enum';
import { Icon } from '@shared/ui/icon/icon';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { socket } from '@shared/utils/socket';

const Messages: FC = () => {
  const [ message, setMessage ] = useState<string>();
  const [ activeChat, setActiveChat ] = useState<string>();
  const [ messages, setMessages ] = useState<any[]>([]);
  const [ users, setUsers ] = useState<any[]>([]);
  const contacts = useSelector(contactsSelector)
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const userMessages = useSelector(messagesSelector);

  const handleEscButton = (evt: KeyboardEvent) => {
    if (KeyboardCodes.ESC === evt.code) {
      setActiveChat('');
    }
  }

  useEffect(() => {

    // TEST
    setUsers([
      {
        id: 1,
        message: 'ПРИВЕТ',
        name: 'Сергей',
        isOnline: true,
        onClick: () => {}
      },
      {
        id: 2,
        message: 'ПРИВЕТ',
        name: 'Сергей',
        isOnline: true,
        onClick: () => {}
      },
      {
        id: 3,
        message: 'ПРИВЕТ',
        name: 'Сергей',
        isOnline: true,
        onClick: () => {}
      }
    ])

    setMessages([
      {
        uid: 1,
        content: 'HELLO'
      },
      {
        uid: 2,
        content: 'HELLO 2'
      }
    ])

    // TEST END
    window.addEventListener('keydown', handleEscButton);

    socket.on('private message', ({content, from}: {content: string, from:{
      uid: string,
        nickName: string
      }}) => {
      const hasUserInChats = users.findIndex((u) => u.id === from.uid);

      if (hasUserInChats === -1) {
        dispatch(addContact({id: from?.uid, name: from?.nickName}));
        dispatch(addMessage({
          content,
          uid: from.uid,
          userName: from.nickName,
        }))
      }

      console.log('has', hasUserInChats)
      console.log('client content', content);
      console.log('client from', from);
    })

    return () => {
      window.removeEventListener('keydown', handleEscButton)
    }
  }, [])

  useEffect(() => {
    const chat = userMessages.findIndex((id) => id.userId === activeChat);

    if (chat !== -1) {
      setMessages((prev) => {
        return [...prev, ...userMessages[chat].messages]
      });
    }
  }, [activeChat])

  const handleInputChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
  }

  const handleButtonClick = () => {
    socket.emit('private message', {message, to: activeChat, from: {
      uid: user.uid,
      nickName: user.nickName,
      avatarUrl: user.avatarUrl
    }})
  }

  const NoActiveChat = (): JSX.Element => {
    return (
      <div>
        <Icon name="chat-svg" />
        Select a chat to start messaging
      </div>
    )
  }

  const ActiveChat = (): JSX.Element => {
    return (
      <>
        {messages.map((m) => {return <div key={ m.uid }>{m.content}</div>})}
        <input type="text" />
      </>
    )
  }

  return (
    <>
      <PageHeader pageName={ 'Messages Page' }/>
      {/* Тест*/}
      <p>Text</p>
      <input type="text" style={ {border: '1px solid black'} } onChange={ handleInputChanges }/>
      <button onClick={ handleButtonClick }>Отправить</button>

      <div className="mb-2">
        {/* {messages.map((mess, index) => { */}
        {/*   return <h2 key={ index }>{mess}</h2> */}
        {/* })} */}
      </div>
      {/* Тест*/}

      {/*  Разметка чата  */}
      <div className="grid grid-cols-12 flex-1">
        <div className="message__chats col-span-4">
          {users.map((data) => {
            return <UserMessageCard
              key={ data.id }
              message={ '' }
              name={ data.name }
              isOnline={ false }
              onClick={ () => setActiveChat(data.id) }
            />
          })}
        </div>
        <div className={ cn('col-span-8 px-2 message__active-chat', {'flex items-center justify-center': !activeChat}) }>
          {!activeChat && <NoActiveChat />}
          {activeChat && <ActiveChat />}
        </div>
      </div>
    </>
  )
}

export { Messages }
