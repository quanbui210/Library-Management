import { Book } from '../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import BookCard from '../book-list/card/BookCard'
export function FavouriteBooks() {
  const favBooks = useSelector((state: RootState) => state.book.favourites)
  console.log(favBooks)
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Favourites Books</h1>
      {favBooks.length > 0 ? (
        <ul className="book-list">
          {favBooks.map((book) => (
            <li key={book.ISBN}>
              <BookCard book={book} disabled={true} />
            </li>
          ))}
        </ul>
      ) : (
        <h3 style={{ textAlign: 'center', color: 'red' }}>No Favourite Book Added Yet</h3>
      )}
    </div>
  )
}
