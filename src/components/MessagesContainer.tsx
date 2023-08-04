import { useEffect, useRef } from 'react'
import { Message } from '../interfaces'
import InputText from './InputText'
import TextMessage from './TextMessage'

export default function MessagesContainer({
  messages,
  newMessage
}: {
  messages: Message[]
  newMessage: (message: Message) => void
}) {
  const scroll = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    scroll.current?.scroll({
      behavior: 'smooth',
      top: scroll.current.scrollHeight,
    })
  }, [messages])

  return (
    <>
      <div
        ref={scroll}
        className='flex-grow p-3 overflow-y-scroll scroll-pt-[600px] flex flex-col gap-3'
      >
        {messages.map((message) => (
          <TextMessage
            key={message.id}
            senderId={message.sender_id}
            sender={message.sender.name}
            deleted={message.isDeleted}
            date={message.created_at}
          >
            {message.text}
          </TextMessage>
        ))}
      </div>
      <InputText newMessage={newMessage} />
    </>
  )
}
