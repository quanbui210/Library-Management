import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../../../store/store'
import './BookPage.scss'
import bookImg from '../../../../assets/book.png'
import { booksActions } from '../../../../store/books/booksSlice'
import GoBackBtn from '../../../btn/GoBackBtn'

export default function BookPage() {
  const { isbn } = useParams<{ isbn: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin || undefined)
  const book = books.find((book) => {
    return book.isbn.toString() === isbn
  })
  const isBorrowed = book && book.status === 'borrowed'
  const navigate = useNavigate()

  const handleBorrow = () => {
    if (isBorrowed) {
      dispatch(booksActions.returnBook(isbn))
    } else {
      dispatch(booksActions.borrowedBook(isbn))
    }
  }

  return (
    <>
      <GoBackBtn />
      <div className="book-page">
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <img className="book-img" src={bookImg} alt="" />
          </Grid>
          <Grid item xs={5}>
            <h1>
              {book && book.title}
              <span>
                {isAdmin && (
                  <DeleteIcon
                    className="author-actions"
                    onClick={async () => {
                      const confirmed = window.confirm('Delete this book?')
                      if (confirmed) {
                        await dispatch(booksActions.deleteBookByISBNThunk(Number(isbn)))
                        await dispatch(booksActions.fetchBooksThunk())
                        navigate('/home/books')
                      }
                    }}
                  />
                )}
              </span>
              <span>
                {isAdmin && (
                  <EditIcon
                    className="author-actions"
                    onClick={() => {
                      dispatch(booksActions.editing())
                      navigate(`/home/books/edit/${book?.isbn}`)
                    }}
                  />
                )}
              </span>
            </h1>
            <span className="category">
              <i>Category: {book?.categoryName}</i>
            </span>
            <h3>Author: {book?.authorName}</h3>
            <p>{book && book.description}</p>
            <ul>
              <li>isbn: {book?.isbn}</li>
              <li>Pubslished Date: {book?.publishedDate}</li>
              <li>Publisher: {book?.publishers}</li>
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
    </>
  )
}
