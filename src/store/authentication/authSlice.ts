import { User } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean | null
  isLoading: boolean
  invalid: boolean
  error: boolean
  users: User[]
  enteredUsername: string
  enteredPassword: string
  isAdmin: boolean
}

const initialState: AuthState = {
  isLoggedIn: null,
  isLoading: false,
  invalid: false,
  error: false,
  users: [],
  enteredUsername: '',
  enteredPassword: '',
  isAdmin: false
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
      console.log(user)
      if (user) {
        state.isLoggedIn = true
        state.enteredUsername = ''
        state.enteredPassword = ''
        console.log(state.isLoggedIn)
      } else {
        state.invalid = true
        state.isLoggedIn = false
        console.log(state.isLoggedIn)
      }
    },
    resetAuthState: (state) => {
      state.isLoggedIn = null
      state.isLoading = false
      state.invalid = false
      state.error = false
      state.users = []
      state.enteredUsername = ''
      state.enteredPassword = ''
      state.isAdmin = false
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
