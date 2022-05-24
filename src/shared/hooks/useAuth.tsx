import { useEffect, useState } from 'react'

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const userData = localStorage.getItem('userTwitterData')

  useEffect(() => {
    if (userData) {
      setIsAuth(true)
    }
  }, [userData])

  return [isAuth]
}

export { useAuth }
