import BookCard from '../card/BookCard'
import { Book } from '../../../../types'

const handleRender = (books: Book[]) => {
  if (books.length === 0) {
    return <p>No books available.</p>
  }
  return (
    <ul className="book-list">
      {books.map((book: Book) => (
        <li key={book.isbn}>
          <BookCard book={book} disabled={false} />
        </li>
      ))}
    </ul>
  )
}

export default handleRender
