import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthorData } from '../../types'

export interface AuthorsState {
  items: AuthorData[]
  isLoading: boolean
  query: string
  searchResults: []
}

const initialState: AuthorsState = {
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
  reducers: {
    removeAuthor: (state, action) => {
      const { id } = action.payload
      console.log(id)
      const updatedAuthorList = state.items.filter((author) => author.id !== id)
      return { ...state, items: updatedAuthorList } // Return new state object
    },
    editAuthor: (state, action) => {
      const { id, value } = action.payload
      const editedUser = state.items.map((user) => {
        console.log(user.id, id)
        if (user.id === id) {
          user.shortSummary = value
        }
        return user
      })

      // const editedAuthor = state.items.find((user) => user.id === id)
      // if (editedAuthor) {
      //   editedAuthor.shortSummary = value
      //   console.log(JSON.stringify(editedAuthor))

      state.items = editedUser
    },
    updateAuthor: (state, action) => {
      const updatedAuthor = action.payload
      state.items = state.items.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      )
    }
  },
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
