import { useContext, useEffect, useState } from 'react'
import { getCountries, getGame, getScore, validateAnswer } from './api'
import { MainContext } from '../../context'

export default function useGame() {
  const { user } = useContext(MainContext)
  const [data, setData] = useState()
  const [resultData, setResultData] = useState()
  const [answer, setAnswer] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function checkAnswer(alias) {
    setIsLoading(true)
    try {
      const { result, funFacts } = await validateAnswer(alias, answer, user.username)
      setData({ ...data, selfScore: data.selfScore + result.score })
      setResultData({ result, funFacts })
    } finally {
      setIsLoading(false)
      setIsButtonDisabled(true)
    }
  }

  function updateSelection(value) {
    setAnswer(value)
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      try {
        const { game } = await getGame(user.username)
        const { countries } = await getCountries(user.username)
        const { friendsScore, selfScore } = await getScore(user.username)
        setAnswer(countries[0])
        setData({ game, countries, selfScore, friendsScore })
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  return { data, checkAnswer, resultData, isButtonDisabled, isLoading, updateSelection }
}
