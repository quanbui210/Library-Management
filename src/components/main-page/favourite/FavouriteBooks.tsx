import { Book } from '../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import BookCard from '../book-list/card/BookCard'
export function FavouriteBooks() {
  const favBooks = useSelector((state: RootState) => state.book.favourites)
  console.log(favBooks)
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Favourites</h1>
      <ul className="book-list">
        {favBooks.map((book) => (
          <li key={book.ISBN}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  )
}
