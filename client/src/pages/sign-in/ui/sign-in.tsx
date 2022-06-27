import { FC, FormEvent, useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@app/store';
import { addNotification } from '@features/notifications/notificationsSlice';
import { User } from '@features/user/models/User.interface'
import { setUser } from '@features/user/userSlice'
import { Button } from '@shared/ui/button/button'

import { FormInput } from '@shared/ui/form-input/form-input';

import {
  auth,
  getFromDataFromFirestore,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../../firebase'

const SignIn: FC = () => {
  const [ user, loading ] = useAuthState(auth)
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ isLogging, setIsLogging ] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      getFromDataFromFirestore<User>('users', user.uid).then((response) => {
        if (response) {
          Cookies.set('userAuth', JSON.stringify(response))
          dispatch(setUser(response));
          navigate('/')
        }
      })
    }
  }, [ user ])

  const handleLoginSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    setIsLogging(true)

    try {
      await logInWithEmailAndPassword(email, password)
    } catch (err) {
      dispatch(addNotification({type: 'error', title: 'Error', description: 'Wrong password or email'}))
    } finally {
      setIsLogging(false)
    }
  }

  return (
    <div className="w-screen h-screen flex align-center justify-center items-center">
      <form onSubmit={ handleLoginSubmit }>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Sign in
            </h1>

            <FormInput id="login" onChangeHandler={ (e) => setEmail(e.target.value) }/>
            <FormInput id="password" type="password" onChangeHandler={ (e) => setPassword(e.target.value) }/>

            <div className="text-center">
              <Button
                type="submit"
                className="w-full flex-initial"
                buttonType="rounded"
                isLoading={ isLogging }
              >
                Sign in
              </Button>

              <div className="w-full flex items-center justify-between py-5">
                <hr className="w-full bg-gray-400"/>
                <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                  OR
                </p>
                <hr className="w-full bg-gray-400"/>
              </div>

              <Button
                type="submit"
                className="w-full flex-initial mt-2"
                buttonType="rounded"
                isLoading={ loading }
                onClick={ signInWithGoogle }
                iconName="google-svg"
              >
                Continue with Google
              </Button>

              <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                Dont have account?
                <a
                  className="hover:text-gray-500 focus:text-gray-500
                      focus:outline-none focus:underline hover:underline text-sm
                    font-medium leading-none  text-gray-800 cursor-pointer ml-1"
                  onClick={ () => navigate('/sign-up') }
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export { SignIn }