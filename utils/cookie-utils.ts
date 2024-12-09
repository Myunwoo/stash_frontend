import Cookies from 'js-cookie'

const setCookie = (name: string, value: string): void => {
  Cookies.set(name, value)
}

const getCookie = (name?: string): string => {
  if (!name) {
    const allData = Cookies.get()
    if (!allData) {
      return ''
    } else {
      return JSON.stringify(allData)
    }
  } else {
    return Cookies.get(name) ?? ''
  }
}

const removeCookie = (name: string) => {
  Cookies.remove(name)
}

export { setCookie, getCookie, removeCookie }