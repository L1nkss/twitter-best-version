import { FC, FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@shared/ui/button/button'

import { FormInput } from '@shared/ui/form-input/form-input';

import { registerWithEmailAndPassword } from '../../../firebase'

const SignUp: FC = () => {
  const [ email, setEmail ] = useState<string>('')
  const [ name, setName ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ isSigningUp, setIsSigningUp ] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLoginSubmit = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault()

    setIsSigningUp(true)
    try {
      await registerWithEmailAndPassword(name, email, password)
      navigate('/sign-in')
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsSigningUp(false)
    }
  }
  return (
    <div className="w-screen h-screen flex align-center justify-center items-center">
      <form onSubmit={ handleLoginSubmit }>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Sign up
            </h1>

            <FormInput
              id="name"
              onChangeHandler={ (e) => setName(e.target.value) }
              label="userName"
            />
            <FormInput
              id="email"
              onChangeHandler={ (e) => setEmail(e.target.value) }
              label="Email"
            />
            <FormInput
              id="password"
              type="password"
              onChangeHandler={ (e) => setPassword(e.target.value) }
              label="Password"
            />

            <Button
              type="submit"
              className="w-full"
              buttonType="rounded"
              isLoading={ isSigningUp }
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