import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export default function RootLayout() {
  const { getSession, sessionState, token } = useUser()

  useEffect(() => {
    if (token) {
      getSession()
        .then((session) => sessionState(session))
        .catch(() => sessionState(null))
    }
  }, [token])

  return (
    <main
      className={`min-h-screen bg-gradient-to-bl from-rose-400
      via-fuchsia-500 to-indigo-500 flex justify-center items-center`}
    >
      <Outlet />
    </main>
  )
}
