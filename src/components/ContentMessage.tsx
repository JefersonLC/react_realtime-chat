import { getRelativeTime } from '../utils/timeago'

interface IContentMessage {
  children: string
  sender: string
  date: string
}

export default function ContentMessage({
  children,
  sender,
  date,
}: IContentMessage) {
  const timeago = getRelativeTime(date)

  return (
    <>
      <p className='text-[9px] mr-7 mb-1 text-gray-600'>{sender}</p>
      <p>{children}</p>
      <p className='text-[9px] mt-1 text-gray-600 text-end'>{timeago}</p>
    </>
  )
}
