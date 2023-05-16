import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, SetStateAction, useMemo } from 'react'
import { Button, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../../store/store'
import { booksActions } from '../../../store/books/booksSlice'
import BookCard from './card/BookCard'
import './Books.scss'
import { Book } from '../../../types'
import SearchInput from '../../input/SearchInput'
import { AppDispatch } from '../../../store/store'
import handleRender from './render/handleBookRender'
import GoBackBtn from '../../btn/GoBackBtn'

export default function Books() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.book.items)
  const [bookList, setBookList] = useState(books)
  const [searchTerm, setSearchTerm] = useState('')
  // const [page, setPage] = useState(4)
  // const perPage = 8
  // const pagedBook = books.slice((page - 1) * perPage, page * perPage)
  // const filteredBooks = useSelector((state: RootState) => state.book.filterArr)
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)
  // const isSearching = searchTerm.length !== 0 && filteredBooks.length > 0

  // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value)
  // }
  const filterBooks = () => {
    if (searchTerm.trim() === '') {
      setBookList([...books])
    } else {
      const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setBookList([...filteredBooks])
    }
  }

  useEffect(() => {
    filterBooks()
  }, [searchTerm])

  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [dispatch])

  return (
    <div className="books-container">
      <GoBackBtn />
      <div>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {isAdmin && (
          <Button
            className="add-btn"
            onClick={() => {
              navigate('/home/books/add')
              dispatch(booksActions.adding())
            }}>
            Add Book
          </Button>
        )}
        {handleRender(bookList)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Pagination
          className="pagination"
          count={Math.ceil(books.length / perPage)}
          page={page}
          onChange={handlePageChange}
        /> */}
      </div>
    </div>
  )
}
