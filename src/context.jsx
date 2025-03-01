import { useState, createContext, useEffect } from 'react'

export const MainContext = createContext()

function ContextWrapper({ children }) {
  const localUser = localStorage.getItem('user')
  const [toastMessage, setToastMessage] = useState('')
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : undefined)

  function updateToast(text) {
    setToastMessage(text)
    setTimeout(() => {
      setToastMessage('')
    }, 1000)
  }

  function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return (
    <MainContext.Provider value={{ user, toastMessage, updateToast, updateUser }}>
      {children}
    </MainContext.Provider>
  )
}

export default ContextWrapper
