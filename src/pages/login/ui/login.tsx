import {ChangeEvent, useRef, useState} from "react";
import Button from "../../../shared/ui/button/button";
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const navigate = useNavigate();


    const loginButtonClick = (): void => {
        localStorage.setItem('userTwitterData', JSON.stringify({name, login, likedTweets: []}));

        navigate('/');
    }

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="login">Логин</label>
                <input type="text" id="login" onChange={e => setLogin(e.target.value)} />
            </div>

            <Button onClick={loginButtonClick}>Логин</Button>
        </div>
    )
}

export default Login