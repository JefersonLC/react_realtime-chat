import { JWTPayload } from 'jose'

export interface IContext {
  title: (newTitle: string) => void
  signInWithGoogle: () => void
  getSession: () => Promise<Session>
  signOut: () => void
  session: Session | null
  token: string
  sessionState: (session: Session | null) => void
  getMessages: () => Promise<Message[]>
  sendMessage: (sender_id: string, text: string) => Promise<Message>
}

export interface Session extends JWTPayload {
  id: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  locale: string
}

export interface Message {
  id: number
  sender_id: string
  text: string
  isDeleted: boolean
  created_at: string
  sender: {
    name: string
  }
}
