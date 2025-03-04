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

  const debouce = searchDebounceHandler((text) => {
    setUsername(text)
  })

  async function onCreateUsername() {
    if (!username) return
    setIsLoading(true)
    try {
      const friendsUsernames = isValidInvite ? [inviteUsername] : []
      const { message, user } = await createUser(username, friendsUsernames)
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
      isValidUsername(inviteUsername).then((exists) => setIsValidInvite(exists))
    }
  }, [])

  return { isLoading, isValidInvite, onCreateUsername, debouce }
}
