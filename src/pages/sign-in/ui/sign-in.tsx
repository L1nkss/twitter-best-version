import { FC, FormEvent, useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { User } from '@features/user/models/User.interface'
import { setUser } from '@features/user/userSlice'
import { Button } from '@shared/ui/button/button'
import { apiClient } from '@shared/utils/api-client'

import {
  auth,
  getFromDataFromFirestore,
  signInWithGoogle,
} from '../../../firebase'

const SignIn: FC = () => {
  const [user, loading, error] = useAuthState(auth)
  // TODO добавить поле пароль, когда будет авторизация через firebase
  const [login, setLogin] = useState<string>('')
  const [isLogging, setIsLogging] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      getFromDataFromFirestore<User>('users', user.uid).then((response) => {
        if (response) {
          Cookies.set('userAuth', JSON.stringify(response))
          dispatch(setUser(response))
          navigate('/')
        }
      })
    }
  }, [user])

  const handleLoginSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    setIsLogging(true)

    try {
      const response = await apiClient.get<User[]>('/User')

      // response.data.forEach((user) => {
      //   if (user.userName === login) {
      //     localStorage.setItem('userTwitterData', JSON.stringify({ ...user }))
      //     navigate('/')
      //   }
      // })
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
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Sign in
            </h1>
            <div>
              <label
                htmlFor="login"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Login
              </label>
              <input
                id="login"
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="w-full flex-initial"
                buttonType="rounded"
                isLoading={isLogging}
              >
                Sign in
              </Button>

              <Button
                type="submit"
                className="w-full flex-initial mt-2"
                buttonType="rounded"
                isLoading={isLogging}
                onClick={signInWithGoogle}
              >
                Google
              </Button>
              <span className="inline-block my-1.5">or</span>
              <Button
                className="w-full flex-initial"
                buttonType="rounded"
                onClick={() => navigate('/sign-up')}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export { SignIn }
