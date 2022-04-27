import {ChangeEvent, useRef, useState} from "react";
import Button from "../../../shared/ui/button/button";
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import {IUser} from "../../../shared/models/interfaces/IUser";

const Login = () => {
    const [name, setName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();


    const loginButtonClick = async (): Promise<any> => {
        try {
            //
            const response = await axios.post<IUser>('https://62657cf194374a2c5070d523.mockapi.io/api/v1/User', {
                createdAt: new Date(),
                name,
                userName
            })

            if (response.status === 201) {
                localStorage.setItem('userTwitterData', JSON.stringify(response.data));
            }

            navigate('/');
        } catch (e) {
            console.log('e', e)
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="login">Логин</label>
                <input type="text" id="login" onChange={e => setUserName(e.target.value)} />
            </div>

            <Button onClick={loginButtonClick}>Логин</Button>
        </div>
    )
}

export default Login