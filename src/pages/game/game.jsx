import React, { useState } from 'react'
import useGame from './hooks/useGame'
import SadAnime from '../../components/animations/sad/sad'
import ConfettiAnime from '../../components/animations/confetti/confetti'

export default function MainGame() {
  const { data, checkAnswer, resultData, isButtonDisabled, isLoading } = useGame()
  const [answer, setAnswer] = useState('')

  if (!data) return
  const { game, countries, selfScore, friendsScore } = data
  return (
    <>
      {resultData && (resultData.result.correct ? <ConfettiAnime /> : <SadAnime />)}
      <div className='h-full p-4'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            {friendsScore.map((score, i) => (
              <div className='text-black font-bold text-xl' key={i}>
                Friend-{i} Score: {score}
              </div>
            ))}
            <div className='text-black font-bold text-xl'>My Score: {selfScore}</div>
          </div>
          <button className='btn btn-accent btn-lg text-white capitalize'>invite</button>
        </div>
        <div className='flex flex-col justify-center items-center h-[80%]'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <ul className='steps steps-vertical text-white'>
              {game.clues.map((clue, i) => (
                <li key={i} className='step step-primary text-black'>
                  {clue}
                </li>
              ))}
            </ul>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Select the country</span>
              </div>
              <select
                onChange={(e) => setAnswer(e.target.value)}
                className='select select-bordered'>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <div className='flex justify-between gap-4 w-full'>
              <button
                disabled={isButtonDisabled || isLoading}
                onClick={() => checkAnswer(game.alias, answer)}
                className='btn btn-primary capitalize text-white w-1/2'>
                check
              </button>
              <button
                disabled={isLoading}
                onClick={() => window.location.reload()}
                className='btn btn-primary capitalize text-white w-1/2'>
                next question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
