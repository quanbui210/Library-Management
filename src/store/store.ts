import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authentication/authSlice'

export type RootState = ReturnType<typeof configureStore>

const store = configureStore({
  reducer: {
    auth: authSlice
  }
})

export default store
