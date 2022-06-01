import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import {userSelector} from '@features/user/userSlice';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const user = useSelector(userSelector)

  useEffect(() => {
    if (user.id) {
      setIsAuth(true)
    }
  }, [user])

  return [isAuth]
}

export { useAuth }
