import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthorData } from '../../types'

export interface AuthorsState {
  items: AuthorData[]
  isLoading: boolean
  query: string
  searchResults: any[]
}

const initialState: AuthorsState = {
  items: [],
  isLoading: false,
  query: '',
  searchResults: []
}

interface AddAuthorPayload {
  author: {
    name: string
    description: string
    image?: string
  }
}

interface EditAuthorPayload {
  authorId: string
  author: {
    name: string
    description: string
    image?: string
  }
}

const addAuthorThunk = createAsyncThunk('authors/add', async (payload: AddAuthorPayload) => {
  const response = await fetch('https://lib-backend-e0qi.onrender.com/api/v1/authors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.author)
  })
  const newAuthor = await response.json()
  return newAuthor
})

const editAuthorThunk = createAsyncThunk('authors/edit', async (payload: EditAuthorPayload) => {
  console.log(payload.authorId)
  const response = await fetch(
    `https://lib-backend-e0qi.onrender.com/api/v1/authors/${payload.authorId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.author)
    }
  )
  const newAuthor = await response.json()
  return newAuthor
})

const fetchAuthorsThunk = createAsyncThunk('authors/fetch', async () => {
  const response = await fetch(`https://lib-backend-e0qi.onrender.com/api/v1/authors`)
  const authorsData = await response.json()
  return {
    authorsData
  }
})

const deleteAuthor = createAsyncThunk(
  'books/deleteBookById',
  async (authorId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://lib-backend-e0qi.onrender.com/api/v1/authors/${authorId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (!response.ok) {
        throw new Error('Failed to delete book')
      }
      return authorId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

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
    builder.addCase(addAuthorThunk.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(addAuthorThunk.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        items: [...state.items, action.payload.author]
      }
    })
    builder.addCase(addAuthorThunk.rejected, (state) => {
      return {
        ...state,
        isLoading: false
      }
    })
  }
})

export const authorsActions = {
  ...authorsSlice.actions,
  fetchAuthorsThunk,
  addAuthorThunk,
  editAuthorThunk,
  deleteAuthor
}
export default authorsSlice.reducer
