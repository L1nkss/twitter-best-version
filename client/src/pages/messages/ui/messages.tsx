import { FC, useEffect, useState } from 'react'

import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { PageHeader } from '@shared/ui/page-header/page-header'
import { socket } from '@shared/utils/socket';

const Messages: FC = () => {
  const [ message, setMessage ] = useState<string>();
  const [ messages, setMessages ] = useState<string[]>([]);
  const [ users, setUsers ] = useState<any[]>([])


  useEffect(() => {
    socket.emit('get-users');

    socket.on('client message', (mgs) => {
      setMessages((state) => [ ...state, mgs.value ])
    })

    // Тестовое получение всех пользователей подключенных. Todo переделать
    socket.on('users', (msg) => {
      const sockerUsers = msg.map((user: any) => {
        return {
          sockerId: user.userID,
          isOnline: true,
          message: 'Текст',
          name: user.username.userName
        }
      })

      setUsers(sockerUsers)
    }
    )
  }, [])

  const handleInputChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
  }

  const handleButtonClick = () => {
    socket.emit('message', {value: message})
  }

  return (
    <>
      <PageHeader pageName={ 'Messages Page' }/>
      {/* Тест*/}
      <p>Text</p>
      <input type="text" style={ {border: '1px solid black'} } onChange={ handleInputChanges }/>
      <button onClick={ handleButtonClick }>Отправить</button>

      <div className="mb-2">
        {messages.map((mess, index) => {
          return <h2 key={ index }>{mess}</h2>
        })}
      </div>

      {/*  Разметка чата  */}
      <div className="grid grid-cols-12">
        <div className="message__chats col-span-4">
          {users.map((data) => {
            return <UserMessageCard
              key={ data.sockerId }
              message={ data.message }
              name={ data.name }
              isOnline={ data.isOnline }
            />
          })}
        </div>
        <div className="col-span-8 px-2 ">
          <h2>Сообщения</h2>
        </div>
      </div>
    </>
  )
}

export { Messages }
