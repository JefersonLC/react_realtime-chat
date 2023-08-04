import { useEffect } from 'react'
import LoginButton from '../components/LoginButton'
import GoogleIcon from '../components/icons/GoogleIcon'
import { useUser } from '../hooks/useUser'

export default function Login() {
  const { title } = useUser()

  useEffect(() => {
    title('Sign in')
  }, [])

  return (
    <div className='bg-white p-8 rounded-lg'>
      <div className='mb-8'>
        <h1 className='font-bold text-2xl'>Sign in</h1>
        <p className='text-md text-gray-500 mt-2'>to continue to Chat</p>
      </div>
      <div>
        <LoginButton icon={<GoogleIcon />}>Continue with Google</LoginButton>
      </div>
    </div>
  )
}
