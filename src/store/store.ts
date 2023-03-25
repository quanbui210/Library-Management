/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authentication/authSlice'
import { AuthState } from './authentication/authSlice'
import booksSlice from './books/booksSlice'
import { BookState } from './books/booksSlice'
import toggleSlice from './toggle/toggleSlice'
import authorsSlice from './authors/authorsSlice'
import { AuthorsState } from './authors/authorsSlice'
import { ToggleState } from './toggle/toggleSlice'

import * as reduxThunk from 'redux-thunk/extend-redux'

export interface RootState {
  auth: AuthState
  book: BookState
  author: AuthorsState
  toggle: ToggleState
}

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: booksSlice,
    toggle: toggleSlice,
    author: authorsSlice
  }
})

export default store
