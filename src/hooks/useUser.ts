import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export function useUser() {
  const context = useContext(AppContext)
  return context
}
