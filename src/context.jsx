import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const MainContext = createContext()

function ContextWrapper({ children }) {
  const navigate = useNavigate()
  const localUser = localStorage.getItem('user')
  const [toastMessage, setToastMessage] = useState('')
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : undefined)

  function updateToast(text) {
    setToastMessage(text)
    setTimeout(() => {
      setToastMessage('')
    }, 2000)
  }

  function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    if (user === '') {
      window.location.reload()
    }
  }

  useEffect(() => {
    if (user) return navigate('/game')
    else navigate('/')
  }, [])

  return (
    <MainContext.Provider value={{ user, toastMessage, updateToast, updateUser }}>
      {children}
    </MainContext.Provider>
  )
}

export default ContextWrapper
