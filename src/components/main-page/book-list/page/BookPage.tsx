import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { AppDispatch, RootState } from '../../../../store/store'
import './BookPage.scss'
import bookImg from '../../../../assets/book.png'
import { booksActions } from '../../../../store/books/booksSlice'
import GoBackBtn from '../../../btn/GoBackBtn'
import { borrowActions } from '../../../../store/borrow/borrowSlice'

export default function BookPage() {
  const { isbn } = useParams<{ isbn: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)
  const { isAdmin, loggedInUser } = useSelector((state: RootState) => state.auth || undefined)
  const book = books.find((book) => {
    return book.isbn.toString() === isbn
  })
  console.log(book)
  const isBorrowed = book && book.status === 'borrowed'
  const navigate = useNavigate()

  const handleBorrow = async () => {
    const confirmed = window.confirm('Borrow this book?')
    if (confirmed) {
      await dispatch(
        borrowActions.borrowBook({
          bookId: book?.id || '',
          userId: loggedInUser.id
        })
      )
      await dispatch(booksActions.fetchBooksThunk())
    }
  }

  useEffect(() => {
    console.log(book)
  }, [dispatch])

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
            <span>{book?.status}</span>
            <br></br>
            <span className="category">
              <i>Category: {book?.categoryName}</i>
            </span>
            <h3>Author: {book?.authorName}</h3>
            <p>{book && book.description}</p>
            <ul>
              <li>isbn: {book?.isbn}</li>
              <li>Pubslished Date: {book?.publishedDate}</li>
              <li>Publisher: {book?.publishers}</li>
            </ul>
            <Button
              disabled={(isAdmin || book?.status === 'BORROWED') ?? false}
              className="borrow-btn"
              onClick={handleBorrow}>
              {isBorrowed ? 'Return' : 'Borrow'}
            </Button>{' '}
            <br />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
