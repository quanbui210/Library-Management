import { User } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isLoggedIn: boolean | null
  isLoading: boolean
  invalid: boolean
  error: boolean
  users: User[]
  enteredUsername: string
  enteredPassword: string
  isAdmin: boolean | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  invalid: false,
  error: false,
  users: [],
  enteredUsername: '',
  enteredPassword: '',
  isAdmin: null
}

const fetchUser = createAsyncThunk('authentication/fetch', async () => {
  const response = await fetch('/users.json')
  const usersData = await response.json()
  return {
    usersData
  }
})

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ enteredUsername: string; enteredPassword: string }>
    ) => {
      const { enteredUsername, enteredPassword } = action.payload
      const regex = new RegExp(`^${enteredUsername}$`, 'i')
      const user = state.users.find((user) => {
        return regex.test(user.username) && user.password === enteredPassword
      })
      if (user) {
        state.isLoggedIn = true
        state.enteredUsername = ''
        state.enteredPassword = ''
        if (user.role === 'admin') {
          state.isAdmin = true
        } else if (user.role === 'user') {
          state.isAdmin = false
        }
      } else {
        state.invalid = true
        state.isLoggedIn = false
        window.alert('invalid')
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload.usersData
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  }
})

export const authActions = { ...authSlice.actions, fetchUser }
export default authSlice.reducer
