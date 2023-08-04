import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoSessionIcon from './icons/NoSessionIcon'

export default function NoSession() {
  const [backLoginMessage, setBackLoginMessage] = useState(false)
  const [backLoginButton, setBackLoginButton] = useState(false)

  useEffect(() => {
    setBackLoginMessage(false)
    setBackLoginButton(false)

    const loginMessage = setTimeout(() => setBackLoginMessage(true), 6000)
    const loginButton = setTimeout(() => setBackLoginButton(true), 9000)

    return () => {
      clearTimeout(loginMessage)
      clearTimeout(loginButton)
    }
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-full text-sm'>
      <NoSessionIcon />
      <p className='text-center mt-5'>
        Could not connect to session. <br /> Retrying
        <span className='mx-1 animate-ping'>.</span>
        <span className='mr-1 animate-ping'>.</span>
        <span className='animate-ping'>.</span>
      </p>
      {backLoginMessage && (
        <p className='mt-4 text-slate-500'>
          This is taking longer than expected
        </p>
      )}
      {backLoginButton && (
        <Link
          to='/login'
          className='mt-4 p-2 rounded-md bg-teal-500 hover:bg-teal-600'
        >
          Back Login
        </Link>
      )}
    </div>
  )
}
