import { Book } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: null | boolean
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null
}

const fetchBooksThunk = createAsyncThunk('books/fetch', async () => {
  const response = await fetch('/books.json')
  const booksData = await response.json()
  return {
    booksData
  }
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        items: action.payload.booksData
      }
    })
    builder.addCase(fetchBooksThunk.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        error: true
      }
    })
  }
})

export const booksActions = { ...booksSlice.actions, fetchBooksThunk }
export default booksSlice.reducer
