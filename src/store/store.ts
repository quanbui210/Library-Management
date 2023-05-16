/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authentication/authSlice'
import { AuthState } from '../types'
import booksSlice from './books/booksSlice'
import { BookState } from './books/booksSlice'
import toggleSlice from './toggle/toggleSlice'
import authorsSlice from './authors/authorsSlice'
import { AuthorsState } from './authors/authorsSlice'
import { ToggleState } from './toggle/toggleSlice'

import * as reduxThunk from 'redux-thunk/extend-redux'
import categorySlice, { CategoryState } from './category/categorySlice'

export interface RootState {
  auth: AuthState
  book: BookState
  author: AuthorsState
  toggle: ToggleState
  category: CategoryState
}
const storedState = localStorage.getItem('reduxState')
const preloadedState = storedState ? JSON.parse(storedState) : undefined

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: booksSlice,
    toggle: toggleSlice,
    author: authorsSlice,
    category: categorySlice
  },
  preloadedState: storedState ? JSON.parse(storedState) : undefined
})
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
export type AppDispatch = typeof store.dispatch
export default store
