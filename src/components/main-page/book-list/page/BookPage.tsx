import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'

import { RootState } from '../../../../store/store'
import './BookPage.scss'
import bookImg from '../../../../assets/book.png'
import { booksActions } from '../../../../store/books/booksSlice'
import { authActions } from '../../../../store/authentication/authSlice'

export default function BookPage() {
  const { ISBN } = useParams<{ ISBN: string }>()
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)
  const book = books.find((book) => book.ISBN === ISBN)
  console.log(book?.status)
  const isBorrowed = book && book.status === 'borrowed'

  const handleBorrow = () => {
    if (isBorrowed) {
      dispatch(booksActions.returnBook(ISBN))
    } else {
      dispatch(booksActions.borrowedBook(ISBN))
    }
  }

  return (
    <div className="book-page">
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <img className="book-img" src={bookImg} alt="" />
        </Grid>
        <Grid item xs={5}>
          <h1>{book && book.title}</h1>
          <span className="category">
            <i>Category: {book?.category}</i>
          </span>
          <h3>Author:{book?.authors.map((a) => a.name)}</h3>
          <p>{book && book.description}</p>
          <ul>
            <li>ISBN: {book?.ISBN}</li>
            <li>Pubslished Date: {book?.publishedDate}</li>
            <li>Publisher: {book?.publisher}</li>
            <li>Borrowed Date: {book?.borrowDate && book.borrowDate}</li>
            <li>Return Date: {book?.returnDate && book.returnDate}</li>
          </ul>
          <button
            disabled={isAdmin}
            className={isAdmin ? 'disabled' : 'avail'}
            onClick={handleBorrow}>
            {isBorrowed ? 'Return' : 'Borrow'}
          </button>{' '}
          <br />
          {isAdmin && (
            <span className="note">
              Note: Admin cannot borrow or return book, please login as user to try
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
