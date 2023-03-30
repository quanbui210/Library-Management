import { Book } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nextId from 'react-id-generator'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: null | boolean
  favourites: Book[]
  message: string
  filterArr: Book[] | []
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  message: '',
  filterArr: []
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
    },
    borrowedBook: (state, action) => {
      const ISBN = action.payload
      const borrowedBook = state.items.find((book) => book.ISBN === ISBN)
      if (borrowedBook) {
        const borrowedDate = new Date()
        borrowedBook.borrowDate = borrowedDate.toISOString()
        borrowedBook.status = 'borrowed'
        borrowedBook.borrowedId = nextId()
        window.alert(`You have successfully borrowed ${borrowedBook.title}`)
      }
    },
    returnBook: (state, action) => {
      const ISBN = action.payload
      const returnedBook = state.items.find(
        (book) => book.ISBN === ISBN && book.status === 'borrowed'
      )
      if (returnedBook) {
        const returnedDate = new Date()
        returnedBook.status = 'available'
        returnedBook.returnDate = returnedDate.toISOString()
        returnedBook.borrowedId = null
        window.alert(`You have successfully return "${returnedBook.title}"`)
      }
    },
    editBook: (state, action) => {
      const { ISBN, selectedBook } = action.payload
      console.log(ISBN)
      state.items = state.items.map((book) => {
        if (book.ISBN === ISBN) {
          return {
            ...book,
            ...selectedBook
          }
        }
        return book
      })
      localStorage.setItem('books', JSON.stringify(state.items))
    },
    addNewBook: (state, action) => {
      const { newBook } = action.payload
      const existingBook = state.items.find(
        (book) => book.ISBN === newBook.ISBN || book.title === newBook.title
      )
      if (existingBook) {
        window.alert('book already existed')
      } else {
        state.items = [...state.items, newBook]
        window.alert('Successfully add new book')
        localStorage.setItem('books', JSON.stringify(state.items))
      }
    },
    removeBook: (state, action) => {
      const ISBN = action.payload
      const selectedBook = state.items.find((book) => book.ISBN === ISBN)
      if (selectedBook) {
        const confirm = window.confirm('Do you want to delete this book FOREVERRRRR?')
        if (confirm) {
          state.items = state.items.filter((book) => book.ISBN !== selectedBook.ISBN)
        }
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
