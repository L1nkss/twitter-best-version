import { FC, FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { IUser } from '@shared/models/interfaces/User.interface'
import { Button } from '@shared/ui/button/button'
import { apiClient } from '@shared/utils/api-client'

const SignUp: FC = () => {
  const [login, setLogin] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLoginSubmit = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault()

    setIsSigningUp(true)
    try {
      const response = await apiClient.post<IUser>('/User', {
        createdAt: new Date(),
        name: name,
        userName: login,
      })

      if (response.status === 200) {
        navigate('/sign-in')
      }
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsSigningUp(false)
    }
  }
  return (
    <div className="w-screen h-screen flex align-center justify-center items-center">
      <form onSubmit={handleLoginSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Sign up
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

            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              buttonType="rounded"
              isLoading={isSigningUp}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { SignUp }
