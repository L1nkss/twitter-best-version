import { FC, useEffect, useState } from 'react'

import io from 'socket.io-client';

import { UserMessageCard } from '@entities/user-message-card/ui/user-message-card';
import { PageHeader } from '@shared/ui/page-header/page-header'

const Messages: FC = () => {
    const [message, setMessage] = useState<string>();
    const [messages, setMessages] = useState<string[]>([]);
    const socket = io('http://localhost:8080/');

    const testMockData = [
        {
            id: '1',
            message: 'Привет как дела?',
            name: 'Имя Фамилия',
            isOnline: true
        },
        {
            id: '1',
            message: 'Какой то длинный текст текст текст текст текст текст текст текст',
            name: 'Имя Фамилия 2 ',
            isOnline: false
        }
    ]

    useEffect(() => {
        socket.on('client message', (mgs) => {
            setMessages((state) => [...state, mgs.value])
        })
    }, [])
    
    const handleInputChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value);
    }

    const handleButtonClick = () => {
        socket.emit('message', {value: message})
    }

    return (
        <>
            <PageHeader pageName={ 'Messages Page' } />
            {/* Тест*/}
            <p>Text</p>
            <input type="text" style={{border: '1px solid black'}} onChange={ handleInputChanges } />
            <button onClick={ handleButtonClick }>Отправить</button>

            <div className="mb-2">
                {messages.map((mess, index) => {
                    return <h2 key={ index }>{mess}</h2>
                })}
            </div>

            {/*  Разметка чата  */}
            <div className="grid grid-cols-12">
                <div className="message__chats col-span-4">
                    {testMockData.map((data) => {
                        return <UserMessageCard
                            key={ data.id }
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
