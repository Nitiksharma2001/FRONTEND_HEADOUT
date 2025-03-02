import React, { useContext, useEffect, useState } from 'react'
import useGame from './hooks/useGame'
import SadAnime from '../../components/animations/sad/sad'
import ConfettiAnime from '../../components/animations/confetti/confetti'
import { MainContext } from '../../context'

export default function MainGame() {
  const { data, checkAnswer, resultData, isButtonDisabled, isLoading, updateSelection } = useGame()
  const { user, updateUser, updateToast } = useContext(MainContext)

  if (!data) return
  const { game, countries, selfScore, friendsScore } = data

  function inviteLink() {
    const link = import.meta.env.VITE_FRONTEND_URL + '/' + user.username
    navigator.clipboard.writeText(link)
    updateToast('invite link copied')
  }
  return (
    <>
      {resultData && (resultData.result.correct ? <ConfettiAnime /> : <SadAnime />)}
      <div className='h-full p-4'>
        <div className='flex justify-between flex-wrap'>
          <div className='flex gap-4'>
            {friendsScore.map(({ score, username }, i) => (
              <div
                className='text-black font-bold text-xl flex flex-col justify-center items-center'
                key={i}>
                {username} <span className='font-normal'>Score: {score}</span>
              </div>
            ))}
          </div>
          <div className='text-black font-bold text-xl'>My Score: {selfScore}</div>
          <div className='flex gap-4'>
            <button onClick={inviteLink} className='btn btn-accent btn-base text-white capitalize'>
              invite
            </button>
            <button
              onClick={() => updateUser('')}
              className='btn btn-accent btn-base text-white capitalize'>
              signout
            </button>
          </div>
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
                onChange={(e) => updateSelection(e.target.value)}
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
                onClick={() => checkAnswer(game.alias)}
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
          {/* {resultData.map(({ funcFacts }) => (
            <></>
          ))} */}
        </div>
      </div>
    </>
  )
}
