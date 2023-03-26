/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Book } from '../../../../types'
import bookImg from '../../../../assets/book.png'
import './BookCard.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { booksActions } from '../../../../store/books/booksSlice'
import { useState, useEffect } from 'react'
import { RootState } from '../../../../store/store'

const BookCard = (props: { book: Book; disabled: boolean }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { book, disabled } = props
  const favourites = useSelector((state: RootState) => state.book.favourites)
  const [isFav, setIsFav] = useState(favourites.find((favBook) => favBook.ISBN === book.ISBN))

  const handleFavClick = () => {
    if (isFav) {
      dispatch(booksActions.removeFavourite({ ISBN: book.ISBN }))
    } else {
      dispatch(booksActions.addToFavourite({ ISBN: book.ISBN }))
    }
  }

  useEffect(() => {
    const updatedIsFav = favourites.find((favBook) => favBook.ISBN === book.ISBN)
    if (updatedIsFav !== isFav) {
      setIsFav(updatedIsFav)
    }
  }, [favourites])
  return (
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
      <CardContent onClick={() => navigate(`/home/books/${book.ISBN}`)}>
        <h4>{book.authors.map((author) => author.name)}</h4>
        <ul>
          <li>ISBN: {book.ISBN}</li>
          <li>Published on: {book.publishedDate}</li>
          <li>
            Publisher: <i style={{ color: '#2b5cb7', fontWeight: 'bold' }}>{book.publisher}</i>
          </li>
        </ul>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={disabled}
          color={isFav ? 'error' : 'default'}
          aria-label="add to favorites"
          onClick={handleFavClick}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="view">
          <Link to={`/home/books/${book.ISBN}`}>
            <SearchIcon />
          </Link>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default BookCard
