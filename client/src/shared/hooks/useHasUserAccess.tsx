import { useSelector } from 'react-redux'

import { RootState } from '@app/store'

const useHasUserAccess = (id: string): boolean => {
  const userId = useSelector((state: RootState) => state.user.uid)
  return userId === id
}

export { useHasUserAccess }
