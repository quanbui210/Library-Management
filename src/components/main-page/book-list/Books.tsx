import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Button, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../../store/store'
import { booksActions } from '../../../store/books/booksSlice'
import './Books.scss'
import SearchInput from '../../input/SearchInput'
import { AppDispatch } from '../../../store/store'
import handleRender from './render/handleBookRender'
import GoBackBtn from '../../btn/GoBackBtn'

export default function Books() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const perPage = 8

  const books = useSelector((state: RootState) => state.book.items)
  const filteredBooks = useSelector((state: RootState) => state.book.filterArr)
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)
  const isSearching = searchTerm !== '' && filteredBooks.length > 0
  console.log(isSearching)

  const pagedBooks = isSearching
    ? filteredBooks.slice((page - 1) * perPage, page * perPage)
    : books.slice((page - 1) * perPage, page * perPage)
  const pageCount = isSearching
    ? Math.ceil(filteredBooks.length / perPage)
    : Math.ceil(books.length / perPage)

  console.log(pagedBooks)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const filterBooks = () => {
    if (searchTerm.trim() === '') {
      dispatch(booksActions.filterBook(''))
    } else {
      dispatch(booksActions.filterBook(searchTerm))
    }
  }

  useEffect(() => {
    filterBooks()
  }, [searchTerm])

  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])

  return (
    <div className="books-container">
      <GoBackBtn />
      <div>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {isAdmin && (
          <Button className="add-btn" onClick={() => navigate('/home/books/add')}>
            Add Book
          </Button>
        )}
        {isSearching && filteredBooks.length > 0
          ? handleRender(filteredBooks)
          : handleRender(pagedBooks)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          className="pagination"
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}
