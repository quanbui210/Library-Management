/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import GoBackBtn from '../../btn/GoBackBtn'
import { RootState } from '../../../store/store'
import SearchInput from '../../input/SearchInput'
import { booksActions } from '../../../store/books/booksSlice'
import { authorsActions } from '../../../store/authors/authorsSlice'

import './Authors.scss'
import { Button } from '@mui/material'

export default function Authors() {
  const dispatch = useDispatch()
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)
  const authors = useSelector((state: RootState) => state.author.items)
  const isLoading = useSelector((state: RootState) => state.author.isLoading)
  const [authorList, setAuthorList] = useState([...authors])
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteTrigger, setDeleteTrigger] = useState(false) // new state variable
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authorsActions.fetchAuthorsThunk())
    dispatch(booksActions.fetchBooksThunk())
  }, [])

  useEffect(() => {
    setAuthorList([...authors])
  }, [deleteTrigger])

  const filterAuthors = () => {
    if (searchTerm.trim() === '') {
      setAuthorList([...authors])
    } else {
      const filteredAuthors = authors.filter((author: { name: string }) => {
        return author.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setAuthorList([...filteredAuthors])
    }
  }

  useEffect(() => {
    filterAuthors()
  }, [searchTerm])

  if (isLoading || authorList.length < 1) {
    return <h2>Loading....</h2>
  }

  return (
    <div className="authors-list">
      <GoBackBtn />
      <div style={{ textAlign: 'center' }}>
        <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {isAdmin && (
          <Button className="add-new-btn" onClick={() => navigate('/home/authors/add')}>
            Add Author
          </Button>
        )}
      </div>
      <h1>Authors</h1>
      <ul>
        {Array.isArray(authorList) &&
          authorList
            .filter((author: { name: string }) => {
              return author?.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
            .map((author) => (
              <li key={author.id} className="author-card">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <img src={author.image} alt="" />
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <h2>
                          {author.name}
                          <span>
                            {isAdmin && (
                              <DeleteIcon
                                className="author-actions"
                                onClick={() => {
                                  dispatch(authorsActions.deleteAuthor(author.id))
                                  setDeleteTrigger(!deleteTrigger)
                                }}
                              />
                            )}
                          </span>
                          <span>
                            {isAdmin && (
                              <EditIcon
                                className="author-actions"
                                onClick={() => navigate(`/home/authors/edit/${author.id}`)}
                              />
                            )}
                          </span>
                        </h2>
                        {/* <span>
                          <i>{author.dateOfBirth}</i>
                        </span> */}
                        <p className="author-summary">
                          <i>{author.description}</i>
                        </p>

                        <p>Famous book(s): </p>
                        <ul>
                          {author.books.map((book) => (
                            <li className="famous-books" key={book.isbn}>
                              <Link to={`/home/books/${book.isbn}`}>
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
