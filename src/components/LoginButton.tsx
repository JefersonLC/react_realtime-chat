import { useUser } from '../hooks/useUser'

interface ILoginButton {
  icon: JSX.Element
  children: string
}

export default function LoginButton({ icon, children }: ILoginButton) {
  const { signInWithGoogle } = useUser()

  return (
    <button
      className={`border px-4 py-2 rounded-md text-xs flex items-center
      bg-inherit hover:bg-gray-100 min-w-[200px] sm:min-w-[300px]
      transition-[background] duration-[350ms]`}
      onClick={signInWithGoogle}
    >
      {icon} <span className='ml-2 text-gray-700'>{children}</span>
    </button>
  )
}
