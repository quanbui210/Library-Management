import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
export default function BookPage() {
  const { ISBN } = useParams<{ ISBN: string }>()
  console.log(ISBN)
  const books = useSelector((state: RootState) => state.book.items)
  const book = books.find((book) => book.ISBN === ISBN)
  console.log(book)
  return (
    <div>
      <h1>
        {book && book.title ? book.title : 'This book is currently not avaiable in our library'}
      </h1>
    </div>
  )
}
