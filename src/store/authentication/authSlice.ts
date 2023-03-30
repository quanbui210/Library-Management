/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User, GoogleUser, AddUserPayload, AuthState } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { GoogleLoginResponse } from 'google-auth-library'

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  invalid: false,
  error: false,
  users: [],
  enteredUsername: '',
  enteredPassword: '',
  isAdmin: null,
  addUserError: null,
  loggedInUserName: '',
  googleUser: undefined,
  profile: null
}

const fetchUser = createAsyncThunk('authentication/fetch', async () => {
  const response = await fetch('../public/data/users.json')
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
        state.loggedInUserName = user.fullName
        state.googleUser = undefined
        if (user.role === 'admin') {
          state.isAdmin = true
        } else if (user.role === 'user') {
          state.isAdmin = false
        }
      } else {
        state.invalid = true
        state.isLoggedIn = false
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
    addUsers: (state, action: PayloadAction<AddUserPayload>) => {
      const { id, username } = action.payload
      const existingUser = state.users.find((user) => user.id === id || user.username === username)
      if (existingUser) {
        state.addUserError = true
        window.alert(`User with id: ${id} or username:' ${username}' already exsists`)
      } else {
        state.users.push(action.payload)
        window.alert(`Successfully added "${username}"`)
      }
    },
    deleteUser: (state, action) => {
      const { id, role } = action.payload
      console.log(role)
      if (role === 'user') {
        const updatedUsers = state.users.filter((user) => user.id !== id)
        state.users = updatedUsers
      } else {
        window.alert('Cannot delete admin')
      }
    },
    setGoogleProfile: (state, action) => {
      const { profile } = action.payload
      const newGoogleUser = {
        id: profile.id,
        fullName: profile.email,
        role: state.isAdmin ? 'admin' : ('user' as 'user' | 'admin'),
        password: 'password',
        username: profile.given_name,
        booksBorrowed: 4
      }
      state.googleUser = profile // Set Google user data on Google login
      state.isLoggedIn = true
      state.users.push(newGoogleUser) // Set regular user data to null on Google login
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
