import Cookies from 'js-cookie'

export const getCookie = <T>(name: string): T | undefined => {
  const valueFromCookie = Cookies.get(name)

  if (!valueFromCookie) return undefined

  return JSON.parse(valueFromCookie)
}

export const deleteCookie = (name: string) => {
  Cookies.remove(name)
}
