import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'
import { RootState } from '../../../store/store'
import { booksActions } from '../../../store/books/booksSlice'

export default function Books() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Books</h1>
    </div>
  )
}
