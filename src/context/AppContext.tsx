import { ReactNode, createContext, useEffect, useState } from 'react'
import { IContext, Message, Session } from '../interfaces'

interface IAppContextProvider {
  children: ReactNode
}

const API_URL = import.meta.env.VITE_API_URL + '/api'

export const AppContext = createContext<IContext>(null!)

export default function AppContextProvider({ children }: IAppContextProvider) {
  const [session, setSession] = useState<Session | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenInURL = new URLSearchParams(location.search).get('access_token')
    const tokenInStorage = localStorage.getItem('access_token')

    if (tokenInStorage) {
      setToken(JSON.parse(tokenInStorage) as string)
    }

    if (tokenInURL) {
      setToken(tokenInURL)
      localStorage.setItem('access_token', JSON.stringify(tokenInURL))
    }

    history.pushState({}, location.origin, '/#')
  }, [])

  function changeTitle(newTitle: string) {
    document.title = newTitle
  }

  function signInWithGoogle() {
    location.href = API_URL + '/auth/google'
  }

  function signOut() {
    localStorage.removeItem('access_token')
    setSession(null)
  }

  function sessionState(session: Session | null) {
    setSession(session)
  }

  async function getSession() {
    const res = await fetch(API_URL + '/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Authentication Error')

    const data = (await res.json()) as Session

    return data
  }

  async function getMessages() {
    const res = await fetch(API_URL + '/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('GetMessages Error')

    const data = (await res.json()) as Message[]

    return data
  }

  async function sendMessage(sender_id: string, text: string) {
    const res = await fetch(API_URL + '/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        sender_id,
        text,
      }),
    })

    if (!res.ok) throw new Error('SendMessage Error')

    const data = (await res.json()) as Message

    return data
  }

  return (
    <AppContext.Provider
      value={{
        title: changeTitle,
        signInWithGoogle,
        getSession,
        signOut,
        session,
        token,
        sessionState,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
