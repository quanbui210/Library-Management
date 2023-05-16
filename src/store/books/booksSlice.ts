import { Book } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create } from 'domain'
import nextId from 'react-id-generator'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: null | boolean
  favourites: Book[]
  message: string
  filterArr: Book[] | []
  editing: boolean
  adding: boolean
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  message: '',
  filterArr: [],
  editing: false,
  adding: false
}

interface AddBookPayload {
  book: {
    isbn: number
    title: string
    publishedDate: string
    description: string
    status: string
    publishers: string
    authorId: string
    categoryId: string
  }
}

interface EditBookPayload {
  isbn: number
  book: {
    isbn: number
    title: string
    publishedDate: string
    description: string
    status: string
    publishers: string
    authorId: string
    categoryId: string
  }
}

const fetchBooksThunk = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`http://localhost:8080/api/v1/books`)
  const books = await res.json()
  return {
    books
  }
})
const addBooksThunk = createAsyncThunk('books/add', async (payload: AddBookPayload) => {
  const response = await fetch('http://localhost:8080/api/v1/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.book)
  })
  const newBook = await response.json()
  return newBook
})
const deleteBookByISBNThunk = createAsyncThunk(
  'books/deleteBookById',
  async (isbn: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to delete book')
      }
      return isbn
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
const editBookThunk = createAsyncThunk('books/edit', async (payload: EditBookPayload) => {
  console.log(payload.book.isbn)
  const response = await fetch(`http://localhost:8080/api/v1/books/${payload.book.isbn}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.book)
  })
  const newBook = await response.json()
  return newBook
})
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      const { isbn } = action.payload
      const addedBook = state.items.find((book) => book.isbn === isbn)
      if (addedBook) {
        const existingFavBook = state.favourites.find((book) => book.isbn === addedBook.isbn)
        if (existingFavBook) {
          return
        } else {
          addedBook.isFav = true // Set the isFavourite flag to true
          state.favourites.push(addedBook)
          localStorage.setItem('favourites', JSON.stringify(state.favourites))
        }
      }
    },
    editing: (state) => {
      state.editing = true
      state.adding = false
    },
    adding: (state) => {
      state.editing = false
      state.adding = true
    },
    removeFavourite: (state, action) => {
      const { isbn } = action.payload
      const removedBook = state.items.find((book) => book.isbn === isbn)
      if (removedBook) {
        removedBook.isFav = false // Set the isFavourite flag to false
        state.favourites = state.favourites.filter((book) => book.isbn !== removedBook.isbn)
        localStorage.setItem('favourites', JSON.stringify(state.favourites))
      }
    },
    borrowedBook: (state, action) => {
      const isbn = action.payload
      const borrowedBook = state.items.find((book) => book.isbn === isbn)
      if (borrowedBook) {
        const borrowedDate = new Date()
        borrowedBook.borrowDate = borrowedDate.toISOString()
        borrowedBook.status = 'borrowed'
        borrowedBook.borrowedId = nextId()
        window.alert(`You have successfully borrowed ${borrowedBook.title}`)
      }
    },
    returnBook: (state, action) => {
      const isbn = action.payload
      const returnedBook = state.items.find(
        (book) => book.isbn === isbn && book.status === 'borrowed'
      )
      if (returnedBook) {
        const returnedDate = new Date()
        returnedBook.status = 'available'
        returnedBook.returnDate = returnedDate.toISOString()
        returnedBook.borrowedId = null
        window.alert(`You have successfully return "${returnedBook.title}"`)
      }
    },
    filterBook: (state, action) => {
      const searchTerm = action.payload.trim().toLowerCase()
      const filteredBooks = searchTerm
        ? state.items.filter((book) => book.title.toLowerCase().includes(searchTerm))
        : []
      return {
        ...state,
        filterArr: filteredBooks
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
        items: action.payload.books
      }
    })
    builder.addCase(fetchBooksThunk.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        error: true
      }
    })
    builder.addCase(addBooksThunk.pending, (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(addBooksThunk.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: true,
        items: [...state.items, action.payload]
      }
    })
    builder.addCase(deleteBookByISBNThunk.pending, (state) => {
      return {
        ...state
      }
    })
    builder.addCase(deleteBookByISBNThunk.fulfilled, (state) => {
      return {
        ...state
      }
    })
  }
})

export const booksActions = {
  ...booksSlice.actions,
  fetchBooksThunk,
  addBooksThunk,
  deleteBookByISBNThunk,
  editBookThunk
}
export default booksSlice.reducer
