import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../context'
import { useNavigate, useParams } from 'react-router-dom'
import { searchDebounceHandler } from '../../helpers/debounce'
import { isValidUsername, createUser, getUser } from './api'

export default function useHome() {
  const navigate = useNavigate()
  const { inviteUsername } = useParams()
  const { updateToast, updateUser } = useContext(MainContext)
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidInvite, setIsValidInvite] = useState(false)
  const [isUniqueUsername, setIsUniqueUsername] = useState(true)

  const debouce = searchDebounceHandler((text) => {
    isValidUsername(text).then((exist) => {
      setUsername(text)
      setIsUniqueUsername(!exist)
    })
  })

  async function onSignin() {
    setIsLoading(true)
    try {
      const { user, message } = await getUser(username)
      updateUser(user)
      updateToast(message)
      navigate('/game')
    } finally {
      setUsername('')
      setIsLoading(false)
    }
  }
  async function onCreateUsername() {
    if (!username) return
    setIsLoading(true)
    try {
      const friends = isValidInvite ? [inviteUsername] : []
      const { message, user } = await createUser(username, friends)
      updateToast(message)
      updateUser(user)
      navigate('/game')
    } finally {
      setUsername('')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inviteUsername) {
      isValidUsername(inviteUsername).then((exist) => setIsValidInvite(exist))
    }
  }, [])

  return { isLoading, isValidInvite, isUniqueUsername, onSignin, onCreateUsername, debouce }
}
