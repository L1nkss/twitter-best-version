import {ChangeEvent, FormEvent, FormEventHandler, useRef, useState} from "react";
import Button from "../../../shared/ui/button/button";
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {IUser} from "../../../shared/models/interfaces/User.interface";

const SignIn = () => {
    // TODO добавить поле пароль, когда будет авторизация через firebase
    const [login, setLogin] = useState<string>('');
    const [isLogging, setIsLogging] = useState<boolean>(false)
    const navigate = useNavigate();


    const handleLoginSubmit = async (event: FormEvent): Promise<any> => {
        event.preventDefault();
        setIsLogging(true);

        try {
            const response = await axios.get<IUser[]>('https://62657cf194374a2c5070d523.mockapi.io/api/v1/User');

            response.data.forEach((user) => {
                if (user.userName === login) {
                    localStorage.setItem('userTwitterData', JSON.stringify({...user}));
                    navigate('/');
                }
            })
        } catch (err) {
            console.log('err', err)
        } finally {
            setIsLogging(false)
        }
    }

    return (
        <div className="w-screen h-screen flex align-center justify-center items-center">
            <form onSubmit={handleLoginSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Sign in</h1>
                        <div>
                            <label htmlFor="login" className="block mb-1 text-gray-600 font-semibold">Login</label>
                            <input
                                id="login"
                                type="text"
                                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                onChange={e => setLogin(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" buttonType="rounded" isLoading={isLogging}>Логин</Button>
                    </div>
                </div>
                <Button onClick={() => navigate('/sign-up')}>регистрация</Button>
            </form>
        </div>
    )
}

export default SignIn;