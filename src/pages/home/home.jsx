import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { searchDebounceHandler } from '../../helpers/debounce'
import { MainContext } from '../../context'
import axios from 'axios'

export default function Home() {
  const { updateToast, updateUser } = useContext(MainContext)
  const { username: inviteUsername } = useParams()
  const [isUniqueUsername, setIsUniqueUsername] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const username = useRef()
  const navigate = useNavigate()
  const { user } = useContext(MainContext)

  const debouce = searchDebounceHandler(checkUniqueUsername)

  async function checkUniqueUsername(text) {
    if (!text) return
    const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/exists/' + text)
    const { exist } = data
    setIsUniqueUsername(!exist) 
  }

  async function onCreateUsername() {
    setIsLoading(true)
    try {
      const uniqueUsername = username.current.value
      const friends = [inviteUsername]
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/', {
        method: 'post',
        body: JSON.stringify({ username: uniqueUsername, friends }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const { message, user } = await response.json()

      updateToast(message)
      if (user) {
        updateUser(user)
      }

      navigate('/game')

      username.current.value = ''
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) return navigate('/game')
  }, [])
  return (
    <div className='flex justify-center items-center h-full text-black'>
      <div className='space-y-8 content-center'>
        {inviteUsername && (
          <div className='text-3xl font-bold capitalize'>
            you have been invited by <span className='lowercase'>{inviteUsername}</span>
          </div>
        )}
        <div className='flex flex-row gap-4'>
          <input
            ref={username}
            type='text'
            placeholder='Enter Your Username'
            className='input input-bordered'
            onChange={(e) => debouce(e.target.value)}
          />
          <button
            disabled={!isUniqueUsername}
            onClick={onCreateUsername}
            className={`capitalize ${
              isLoading && 'loading loading-spinner'
            } btn btn-primary text-white`}>
            play game
          </button>
        </div>
      </div>
    </div>
  )
}
