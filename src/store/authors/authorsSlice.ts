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

const addAuthorsThunk = createAsyncThunk('authors/add', async (newAuthor: Partial<AuthorData>) => {
  return {
    author: newAuthor,
    error: null
  }
})

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
      const confirmDelete = window.confirm('Are you sure you want to delete this author?')
      if (confirmDelete) {
        const updatedAuthorList = state.items.filter((author) => author.id !== id)
        state.items = updatedAuthorList
      }
      return state // Return the current state if the user cancels the delete action
    },
    editAuthor: (state, action) => {
      const { id, value } = action.payload
      const editedAuthor = state.items.map((author) => {
        if (author.id === id) {
          return { ...author, shortSummary: value }
        }
        return author
      })

      state.items = editedAuthor
    },
    addAuthor: (state, action) => {
      const { author, id } = action.payload
      console.log(author, id)
      const existingAuthor = state.items.find((au) => au.id === id || au.name === author.name)
      if (existingAuthor) {
        window.alert('Author already exists')
      } else {
        state.items = [...state.items, author]
      }
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
    // builder.addCase(addAuthorsThunk, (state, action) => {
    //   state.isLoading = false
    //   state.items = [action.payload.book, ...state.items]
    // })
  }
})

export const authorsActions = { ...authorsSlice.actions, fetchAuthorsThunk }
export default authorsSlice.reducer
