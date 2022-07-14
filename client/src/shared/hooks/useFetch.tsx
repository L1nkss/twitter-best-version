import { useEffect, useState } from 'react'

import axios from 'axios'

const useFetch = <T, >(url: string, initialValue: T): [ boolean, T ] => {
  const [ data, setData ] = useState<T>(initialValue)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url)

        if (response.status === 200) {
          setData(response.data)
        }
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [ url ])

  return [ isLoading, data ]
}

export { useFetch }
