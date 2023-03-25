import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../../store/store'
import { booksActions } from '../../../store/books/booksSlice'
import BookCard from './card/BookCard'

import './Books.scss'
import { Book } from '../../../types'

export default function Books() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Books</h1>
      <ul className="book-list">
        {books.map((book: Book) => (
          <li key={book.ISBN}>
            <BookCard book={book} disabled={false} />
          </li>
        ))}
      </ul>
    </div>
  )
}
