import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { RootState } from '@app/store'

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user.id) {
      setIsAuth(true)
    }
  }, [user])

  return [isAuth]
}

export { useAuth }
