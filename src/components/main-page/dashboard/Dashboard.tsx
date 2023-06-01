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
                <Typography gutterBottom variant="h6">
                  Total Books
                </Typography>
                <Typography variant="h5" component="h2">
                  {books.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#c5cae9' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Total Authors
                </Typography>
                <Typography variant="h5" component="h2">
                  {authors.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Users
                </Typography>
                <Typography variant="h5" component="h2">
                  {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Returned
                </Typography>
                <Typography variant="h5" component="h2">
                  30
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Not Returned
                </Typography>
                <Typography variant="h5" component="h2">
                  20
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Categories
                </Typography>
                <Typography variant="h5" component="h2">
                  {categories.length}
                </Typography>
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
                  <h5>ID: {book.id}</h5>
                  <h5>{book.title}</h5>
                  <h5>{book.status}</h5>
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
                  <h5>ID: {author.id}</h5>
                  <h5>{author.name}</h5>
                  <h5>books: {author.books.length}</h5>
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
