import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import booksSlice from '../books/booksSlice'

interface AuthorsState {
  items: []
  isLoading: boolean
  query: string
  searchResults: []
}

const initialState = {
  items: [],
  isLoading: false,
  query: '',
  searchResults: []
}

const fetchAuthorsThunk = createAsyncThunk('authors/fetch', async () => {
  const response = await fetch('/authors.json')
  const authorsData = await response.json()
  return {
    authorsData
  }
})

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorsThunk.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchAuthorsThunk.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        items: action.payload.authorsData
      }
    })
    builder.addCase(fetchAuthorsThunk.rejected, (state) => {
      return {
        ...state,
        isLoading: false
      }
    })
  }
})

export const authorsActions = { ...authorsSlice.actions, fetchAuthorsThunk }
export default authorsSlice.reducer
