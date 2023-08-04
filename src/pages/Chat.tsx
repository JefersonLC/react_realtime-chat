import { useEffect, useState } from 'react'
import LoadingChat from '../components/LoadingChat'
import MessagesContainer from '../components/MessagesContainer'
import NoSession from '../components/NoSession'
import { useUser } from '../hooks/useUser'
import { Message } from '../interfaces'
import { socket } from '../socket'

export default function Chat() {
  const { title, session, getMessages } = useUser()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    title('Chat')

    setLoading(true)

    getMessages()
      .then((messages) => setMessages(messages))
      .catch(() => setMessages([]))

    setLoading(false)
  }, [session])

  useEffect(() => {
    socket.on('message', receivedMessage)

    return () => {
      socket.off('message', receivedMessage)
    }
  }, [])

  const receivedMessage = (message: Message) =>
    setMessages((state) => [...state, message])

  return (
    <div
      className={`h-[600px] w-[90%] sm:w-[350px] bg-white
      rounded-xl flex flex-col border-[5px] border-black`}
    >
      {
        loading 
          ? <LoadingChat />
          : session 
            ? <MessagesContainer 
                messages={messages} 
                newMessage={receivedMessage} 
              />
            : <NoSession />
      }
    </div>
  )
}
