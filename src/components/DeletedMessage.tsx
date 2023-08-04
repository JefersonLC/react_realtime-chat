import DeleteIcon from './icons/DeleteIcon'

export default function DeletedMessage() {
  return (
    <span className='flex gap-2 text-gray-700 text-sm'>
      <DeleteIcon />
      Deleted Message
    </span>
  )
}
