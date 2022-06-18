import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { User } from '@features/user/models/User.interface'
import { setUser } from '@features/user/userSlice'
import { getCookie } from '@shared/utils/cookies'
import {useAppDispatch} from "@app/store";

const useAuth = (): [boolean, boolean] => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch();
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
