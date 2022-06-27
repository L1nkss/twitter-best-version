import { log } from 'util';

import { FC, useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@app/store';
import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { contactsSelector } from '@features/contacts/contactsSelector';
import { addContact } from '@features/contacts/contactsSlice';
import { messagesSelector } from '@features/messages/messagesSelector';
import { addMessage } from '@features/messages/messagesSlice';
import { userSelector } from '@features/user/userSelector';
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


  useEffect(() => {
    // socket.emit('get-users');

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
      <div className="grid grid-cols-12">
        <div className="message__chats col-span-4">
          {contacts.map((data) => {
            return <UserMessageCard
              key={ data.id }
              message={ '' }
              name={ data.name }
              isOnline={ false }
              onClick={ () => setActiveChat(data.id) }
            />
          })}
        </div>
        <div className="col-span-8 px-2 ">
          {!activeChat && <div>Select a chat to start messaging </div>}
          {activeChat && messages.map((m) => {
            return <div key={ m.uid }>{m.content}</div>
          })}
        </div>
      </div>
    </>
  )
}

export { Messages }
