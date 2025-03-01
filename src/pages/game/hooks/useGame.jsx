import { useContext, useEffect, useState } from 'react'
import { getCountries, getGame, getScore } from '../apis/game'
import { MainContext } from '../../../context'
import { useNavigate } from 'react-router-dom'

export default function useGame() {
  const { user } = useContext(MainContext)
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [resultData, setResultData] = useState()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function checkAnswer(alias, answer) {
    setIsLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/game', {
        method: 'post',
        body: JSON.stringify({ alias, answer }),
        headers: {
          username: user.username,
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const { result, funFacts } = await response.json()
      setData({ ...data, selfScore: data.selfScore + result.score })
      setResultData({ result, funFacts })
    } finally {
      setIsLoading(false)
      setIsButtonDisabled(true)
    }
  }
  useEffect(() => {
    if (!user) return navigate('/')
    async function getData() {
      const { game } = await getGame(user.username)
      const { countries } = await getCountries(user.username)
      const { friendsScore, selfScore } = await getScore(user.username)
      setData({ game, countries, selfScore, friendsScore })
    }
    getData()
  }, [])
  return { data, checkAnswer, resultData, isButtonDisabled, isLoading }
}
