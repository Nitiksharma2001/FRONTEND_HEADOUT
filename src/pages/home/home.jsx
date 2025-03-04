import { useParams } from 'react-router'
import useHome from './useHome'

export default function Home() {
  const { inviteUsername } = useParams()
  const { isLoading, isValidInvite, isUniqueUsername, onSignin, onCreateUsername, debouce } =
    useHome()

  return (
    <div className='flex justify-center items-center h-full text-black'>
      <div className='space-y-4 content-center'>
        {isValidInvite && (
          <div className='text-3xl font-bold capitalize'>
            you have been invited by <span className='lowercase'>{inviteUsername}</span>
          </div>
        )}
        <div className='flex flex-row gap-4'>
          <input
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
            sign up
          </button>
          <button
            disabled={isUniqueUsername}
            onClick={onSignin}
            className={`capitalize ${
              isLoading && 'loading loading-spinner'
            } btn btn-primary text-white`}>
            sign in
          </button>
        </div>
        <div className='text-green-400'>{!isUniqueUsername && 'username already exists'}</div>
      </div>
    </div>
  )
}
