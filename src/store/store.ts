import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authentication/authSlice'
import { AuthState } from './authentication/authSlice'
import * as reduxThunk from 'redux-thunk/extend-redux'

export interface RootState {
  auth: AuthState
}

const store = configureStore({
  reducer: {
    auth: authSlice
  }
})

export default store
