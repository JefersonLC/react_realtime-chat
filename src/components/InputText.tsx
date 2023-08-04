import { ChangeEvent, FormEvent, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { Message } from '../interfaces'
import { socket } from '../socket'
import SendIcon from './icons/SendIcon'

export default function InputText({
  newMessage,
}: {
  newMessage: (message: Message) => void
}) {
  const { sendMessage, session } = useUser()

  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session || !text) return

    sendMessage(session.id, text)
      .then((message) => {
        newMessage(message)
        socket.emit('message', message)
      })
      .catch(() => setText(''))

    setText('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
  }

  return (
    <div className='bg-teal-800 p-4 rounded-b-md'>
      <form className='flex flex-col sm:flex-row gap-3' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Type messages here...'
          className='py-1 px-2 rounded-md flex-grow max-w-full'
          value={text}
          onChange={handleChange}
        />
        <button
          type='submit'
          className={`rounded-full text-center flex justify-center 
          items-center bg-teal-500 min-h-[35px] min-w-[35px]
          hover:bg-teal-600`}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
