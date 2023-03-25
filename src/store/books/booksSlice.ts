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
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
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
      if (addedBook) {
        const existingFavBook = state.favourites.find((book) => book.ISBN === addedBook.ISBN)
        if (existingFavBook) {
          return
        } else {
          addedBook.isFav = true // Set the isFavourite flag to true
          state.favourites.push(addedBook)
          localStorage.setItem('favourites', JSON.stringify(state.favourites))
        }
      }
    },
    removeFavourite: (state, action) => {
      const { ISBN } = action.payload
      const removedBook = state.items.find((book) => book.ISBN === ISBN)
      if (removedBook) {
        removedBook.isFav = false // Set the isFavourite flag to false
        state.favourites = state.favourites.filter((book) => book.ISBN !== removedBook.ISBN)
        localStorage.setItem('favourites', JSON.stringify(state.favourites))
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
