import Button from "../../../shared/ui/button/button";
import {FormEvent, useId, useState} from "react";
import axios from "axios";
import {ITweet} from "../../../entities/tweet/types/Tweet.interface";
import {IUser} from "../../../shared/models/interfaces/User.interface";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [login, setLogin] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (evt: FormEvent): Promise<any> => {
        evt.preventDefault();

        setIsSigningUp(true);
        // createdAt: Date
        // id: string
        // likedTweets: Array<string>
        // name: string
        // userName: string
        try {
            const response = await axios.post<IUser>('https://62657cf194374a2c5070d523.mockapi.io/api/v1/User', {
                createdAt: new Date(),
                name: name,
                userName: login
            });

            if (response.status === 200) {
                navigate('/sign-in')
            }

        } catch (err) {
            console.log('err', err)
        } finally {
            setIsSigningUp(false);
        }
    }
    return (
        <div className="w-screen h-screen flex align-center justify-center items-center">
            <form onSubmit={handleLoginSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Sign up</h1>

                        <div>
                            <label htmlFor="login" className="block mb-1 text-gray-600 font-semibold">Login</label>
                            <input
                                id="login"
                                type="text"
                                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                onChange={e => setLogin(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block mb-1 text-gray-600 font-semibold">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" buttonType="rounded" isLoading={isSigningUp}>Sign up</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp