import { useEffect, useState } from 'react'

import { Breakpoints } from '../models/enums/breakpoint'
import { listenerOn, listenerOff } from '../utils/listeners'

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
