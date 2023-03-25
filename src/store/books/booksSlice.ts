import { Book } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: null | boolean
  favourites: Book[]
  message: string
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null,
  favourites: [],
  message: ''
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
  reducers: {
    addToFavourite: (state, action) => {
      const { ISBN } = action.payload
      const addedBook = state.items.find((book) => book.ISBN === ISBN)
      console.log(addedBook)
      if (addedBook) {
        const existingFavBook = state.favourites.find((book) => book.ISBN === addedBook.ISBN)
        if (existingFavBook) {
          window.alert('Already Added to Favourite')
        } else {
          state.favourites.push(addedBook)
        }
      }
    },
    removeFavourite: (state, action) => {
      const { ISBN } = action.payload
      const removedBook = state.items.find((book) => book.ISBN === ISBN)
      if (removedBook) {
        state.favourites.filter((book) => book.ISBN !== removedBook.ISBN)
      }
    }
  },
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
