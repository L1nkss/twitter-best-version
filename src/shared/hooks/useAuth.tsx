import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { User } from '@features/user/models/User.interface'
import { setUser } from '@features/user/userSlice'
import { getCookie } from '@shared/utils/cookies'

const useAuth = (): [boolean, boolean] => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const user: User | undefined = getCookie('userAuth')

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
      setIsAuth(true)
    }

    setIsLoading(false)
  }, [user])

  return [isAuth, isLoading]
}

export { useAuth }
