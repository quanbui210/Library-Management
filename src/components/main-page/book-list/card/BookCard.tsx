/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
// import Pagination from '@mui/material/Pagination'

import { Book } from '../../../../types'
import bookImg from '../../../../assets/book.png'
import './BookCard.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { booksActions } from '../../../../store/books/booksSlice'
import { RootState } from '../../../../store/store'
import { AppDispatch } from '../../../../store/store'

const BookCard = (props: { book: Book; disabled: boolean }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { book, disabled } = props
  const favourites = useSelector((state: RootState) => state.book.favourites)

  const handleFavClick = () => {
    const isFav = favourites.find((favBook) => favBook.ISBN === book.ISBN)
    if (isFav) {
      dispatch(booksActions.removeFavourite({ ISBN: book.ISBN }))
    } else {
      dispatch(booksActions.addToFavourite({ ISBN: book.ISBN }))
    }
  }

  return (
    <div>
      <Card className="book-card" sx={{ maxWidth: 345 }}>
        <h2>{book.title}</h2>
        <span>
          <i>"{book.category}"</i>
        </span>
        <CardMedia
          onClick={() => navigate(`/home/books/${book.ISBN}`)}
          component="img"
          height="194"
          image={bookImg}
          alt="book"
        />
        <CardContent className="card-content" onClick={() => navigate(`/home/books/${book.ISBN}`)}>
          <h4>{book.authors && book.authors.map((author) => author.name)}</h4>
          <ul>
            <li>ISBN: {book.ISBN}</li>
            <li>Published: {book.publishedDate}</li>
            <li>
              Publisher: <i style={{ color: '#2b5cb7', fontWeight: 'bold' }}>{book.publisher}</i>
            </li>
          </ul>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            disabled={disabled}
            color={favourites.find((favBook) => favBook.ISBN === book.ISBN) ? 'error' : 'inherit'}
            aria-label="add to favorites"
            onClick={handleFavClick}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="view">
            <Link to={`/home/books/${book.ISBN}`}>
              <SearchIcon style={{ color: '#ccc' }} />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default BookCard
