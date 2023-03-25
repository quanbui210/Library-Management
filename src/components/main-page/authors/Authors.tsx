/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux'
import { authorsActions } from '../../../store/authors/authorsSlice'
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  useEffect,
  useState
} from 'react'
import GoBackBtn from '../../btn/GoBackBtn'
import { RootState } from '../../../store/store'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SearchAuthors from '../../input/SearchAuthors'
import { Link } from 'react-router-dom'
import { booksActions } from '../../../store/books/booksSlice'

import './Authors.scss'

export default function Authors() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const authors = useSelector((state) => state.author.items)
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
      <SearchAuthors
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filterAuthors={filterAuthors}
      />
      <h1>Authors</h1>
      <ul>
        {authorList.map(
          (author: {
            books: any
            dateOfBirth: ReactNode
            name:
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | Key
              | null
              | undefined
            image: string | undefined
            shortSummary:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined
          }) => (
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
                        {author.books.map(
                          (book: {
                            ISBN: Key | null | undefined
                            title:
                              | string
                              | number
                              | boolean
                              | ReactElement<any, string | JSXElementConstructor<any>>
                              | ReactFragment
                              | ReactPortal
                              | null
                              | undefined
                          }) => (
                            <li className="famous-books" key={book.ISBN}>
                              <Link to={`/home/books/${book.ISBN}`}>
                                <a>{book.title}</a>
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
