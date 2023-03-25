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

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { booksActions } from '../../../../store/books/booksSlice'
import { useState } from 'react'

const BookCard = (props: { book: Book }) => {
  const [isFavourite, setIsFavourite] = useState(false)
  const dispatch = useDispatch()
  const { book } = props

  const addToFav = () => {
    dispatch(booksActions.addToFavourite({ ISBN: book.ISBN }))
    setIsFavourite(true)
  }
  const removeFromFav = () => {
    dispatch(booksActions.removeFavourite({ ISBN: book.ISBN }))
    setIsFavourite(false)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <h3>{book.title}</h3>
      <span>
        <i>{book.category}</i>
      </span>
      <CardMedia component="img" height="194" image={bookImg} alt="book" />
      <CardContent>
        <ul>
          <li>ISBN: {book.ISBN}</li>
          <li>Publish on: {book.publishedDate}</li>
          <li>Publisher: #{book.publisher}</li>
        </ul>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color={isFavourite ? 'error' : 'default'}
          aria-label="add to favorites"
          onClick={isFavourite ? removeFromFav : addToFav}>
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
