/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux'
import { authorsActions } from '../../../store/authors/authorsSlice'
import { useEffect, useState } from 'react'
import GoBackBtn from '../../btn/GoBackBtn'
import { RootState } from '../../../store/store'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SearchInput from '../../input/SearchInput'
import { Link } from 'react-router-dom'
import { booksActions } from '../../../store/books/booksSlice'

import './Authors.scss'

export default function Authors() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const authors = useSelector((state: RootState) => state.author.items)
  const [authorList, setAuthorList] = useState(authors)
  useEffect(() => {
    dispatch(authorsActions.fetchAuthorsThunk())
    dispatch(booksActions.fetchBooksThunk())
  }, [])

  const filterAuthors = () => {
    if (searchTerm.trim() === '') {
      setAuthorList(authors)
    } else {
      const filteredAuthors = authors.filter((author: { name: string }) => {
        return author.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setAuthorList(filteredAuthors)
    }
  }
  useEffect(() => {
    filterAuthors()
  }, [searchTerm, authors])

  return (
    <div className="authors-list">
      <GoBackBtn />
      <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <h1>Authors</h1>
      <ul>
        {authorList.map((author) => (
          <li key={author.name} className="author-card">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <img src={author.image} alt="" />
                </Grid>
                <Grid item xs={5}>
                  <div>
                    <h2>
                      <a>{author.name}</a>
                    </h2>
                    <span>
                      <i>{author.dateOfBirth}</i>
                    </span>
                    <p className="author-summary">
                      <i>{author.shortSummary}</i>
                    </p>
                    <p>Famous book(s): </p>
                    <ul>
                      {author.books.map((book) => (
                        <li className="famous-books" key={book.ISBN}>
                          <Link to={`/home/books/${book.ISBN}`}>
                            <p>{book.title}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  )
}
