import { useUser } from '../hooks/useUser'
import ContentMessage from './ContentMessage'
import DeletedMessage from './DeletedMessage'

interface ITextMessage {
  children: string
  sender: string
  senderId: string
  deleted: boolean
  date: string
}

export default function TextMessage({
  children,
  sender,
  senderId,
  date,
  deleted,
}: ITextMessage) {
  const { session } = useUser()

  const textStyle = session?.id !== senderId ? 'justify-start' : 'justify-end'
  const bgColor = session?.id !== senderId ? 'bg-slate-300' : 'bg-teal-500'

  return (
    <div className={`flex ${textStyle}`}>
      <div
        className={`p-2 rounded-lg ${bgColor} w-auto max-w-[220px] break-words`}
      >
        {
          !deleted 
            ? (
              <ContentMessage sender={sender} date={date}>
                {children}
              </ContentMessage>
            )
            : <DeletedMessage />
        }
      </div>
    </div>
  )
}
