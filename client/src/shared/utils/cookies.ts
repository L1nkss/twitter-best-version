import Cookies from 'js-cookie'

export const getCookie = <T>(name: string): T | null => {
  const valueFromCookie = Cookies.get(name)

  if (!valueFromCookie) return null

  return JSON.parse(valueFromCookie)
}

export const deleteCookie = (name: string) => {
  Cookies.remove(name)
}
