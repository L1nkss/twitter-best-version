import { log } from 'util';

import { FC, useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { contactsSelector } from '@features/contacts/contactsSelector';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { socket } from '@shared/utils/socket';

const Messages: FC = () => {
  const [ message, setMessage ] = useState<string>();
  const [ activeChat, setActiveChat ] = useState<string>();
  const [ messages, setMessages ] = useState<string[]>([]);
  const [ users, setUsers ] = useState<any[]>([]);
  const contacts = useSelector(contactsSelector)


  useEffect(() => {
    // socket.emit('get-users');

    socket.on('client message', (mgs) => {
      setMessages((state) => [ ...state, mgs.value ])
    })

    socket.on('private message', ({content, from}: {content: string, from :string}) => {
      console.log('client content', content);
      console.log('client from', from);
    })

    // Тестовое получение всех пользователей подключенных. Todo переделать
    // socket.on('users', (msg) => {
    //   const sockerUsers = msg.map((user: any) => {
    //     return {
    //       sockerId: user.userID,
    //       isOnline: true,
    //       message: 'Текст',
    //       name: user.username.userName
    //     }
    //   })
    //
    //   setUsers(sockerUsers)
    // }
    // )
  }, [])

  const handleInputChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
  }
  const handleButtonClick = () => {
    socket.emit('private message', {message, to: activeChat})
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
          {activeChat && <div>hello</div>}
        </div>
      </div>
    </>
  )
}

export { Messages }
