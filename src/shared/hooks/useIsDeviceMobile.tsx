import { useEffect, useState } from 'react'

import { listenerOn, listenerOff } from '../utils/listeners'
import { Breakpoints } from '../models/enums/breakpoint'

const useCheckIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < Breakpoints.xlg)
    }

    listenerOn(window, 'resize', handleResize)

    handleResize()

    return () => listenerOff(window, 'resize', handleResize)
  }, [])

  return isMobile
}

export { useCheckIsMobile }
