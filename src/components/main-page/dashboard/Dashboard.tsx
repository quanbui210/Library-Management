import { Card, CardContent, Grid, Typography, CircularProgress, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'

import GoBackBtn from '../../btn/GoBackBtn'
import './Dasboard.scss'
import { RootState } from '../../../store/store'
import Categories from '../categories/Categories'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { authorsActions } from '../../../store/authors/authorsSlice'
import { booksActions } from '../../../store/books/booksSlice'
type Books = {
  total: number
  returned: number
  notReturned: number
}

type Authors = {
  total: number
}

type Categories = {
  total: number
}

type DashboardData = {
  books: Books
  authors: Authors
  categories: Categories
}

export default function Dashboard() {
  const books = useSelector((state: RootState) => state.book.items)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const users = useSelector((state: RootState) => state.auth.users)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dashboardData = books && authors

  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
    dispatch(authorsActions.fetchAuthorsThunk)
  }, [dispatch])

  return (
    <div className="dasboard-container">
      <GoBackBtn />
      <Typography variant="h4" component="h1" mb={4}>
        Dashboard
      </Typography>
      {dashboardData ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f8bbd0' }}>
              <CardContent>
                <h3>Total Books</h3>
                <h2>{books.length}</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#c5cae9' }}>
              <CardContent>
                <h3>Total Authors</h3>
                <h2>{authors.length}</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <h3>Users</h3>
                <h2>{users.length}</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <h3>Returned</h3>
                <h2>30</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <h3>Not Returned</h3>
                <h2>20</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <h3>Categories</h3>
                <h2>{categories.length}</h2>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress /> // Display a loading spinner while fetching data
      )}
      <div className="admin-actions">
        <div className="admin-table">
          <Card className="data-card">
            <CardContent>
              <h3>List of Books</h3>
              <AddIcon className="add-icon" onClick={() => navigate('/home/books/add')}>
                {' '}
                Add a new author
              </AddIcon>
              {books.map((book) => (
                <div key={book.id} className="book-item">
                  <h5 className="a-book">ID: {book.id}</h5>
                  <h5 className="a-name">{book.title}</h5>
                  <h5 className="a-id">{book.status}</h5>
                  <div>
                    <EditIcon
                      className="author-actions"
                      onClick={() => navigate(`/home/books/edit/${book.id}`)}
                    />
                    <DeleteIcon
                      className="author-actions"
                      onClick={() => {
                        const confirm = window.confirm('Delete this book?')
                        if (confirm) {
                          dispatch(booksActions.deleteBookByISBNThunk(book.isbn))
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="admin-table">
          <Card className="data-card">
            <CardContent>
              <h3>List of Authors</h3>
              <AddIcon className="add-icon" onClick={() => navigate('/home/authors/add')}>
                {' '}
                Add a new author
              </AddIcon>

              {authors.map((author) => (
                <div key={author.id} className="author-item">
                  <h5 className="a-id">ID: {author.id}</h5>
                  <h5 className="a-name">{author.name}</h5>
                  <h5 className="a-book">books: {author.books.length}</h5>
                  <div>
                    <EditIcon
                      className="author-actions"
                      onClick={() => navigate(`/home/authors/edit/${author.id}`)}
                    />
                    <DeleteIcon
                      className="author-actions"
                      onClick={() => {
                        if (author.books.length > 0) {
                          window.alert('cannot delete author that already have books')
                        } else {
                          const confirmed = window.confirm('Delete this author?')
                          if (confirmed && author.books.length > 0) {
                            dispatch(authorsActions.deleteAuthor(author.id))
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
