import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../../store/store'
import { booksActions } from '../../../store/books/booksSlice'
import BookCard from './card/BookCard'

import './Books.scss'
import { Book } from '../../../types'
import SearchInput from '../../input/SearchInput'

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('')
  const [bookList, setBookList] = useState<Book[]>([])
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  const filterBooks = () => {
    if (searchTerm.trim() === '') {
      setBookList(books)
    } else {
      const filteredBooks = books.filter((book: Book) => {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setBookList(filteredBooks)
    }
  }
  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])
  useEffect(() => {
    filterBooks()
  }, [searchTerm, books])
  return (
    <div className="book-container">
      <h1 style={{ textAlign: 'center' }}>Books</h1>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul className="book-list">
        {bookList.map((book: Book) => (
          <li key={book.ISBN}>
            <BookCard book={book} disabled={false} />
          </li>
        ))}
      </ul>
    </div>
  )
}
