/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AddUserPayload, AuthState } from '../../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  profile: null,
  loggedInUser: {
    id: '',
    username: ''
  }
}

export const fetchUsers = createAsyncThunk('authentication/fetchUsers', async () => {
  const response = await fetch('http://localhost:8080/api/v1/users')
  const usersData = await response.json()
  return {
    usersData
  }
})

export const signupThunk = createAsyncThunk(
  'authentication/signup',
  async (user: { username: string; password: string }) => {
    const response = await fetch('http://localhost:8080/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    console.log(JSON.stringify(user))
    const newUser = await response.json()
    return newUser
  }
)

const loginThunk = createAsyncThunk(
  'login/post',
  async (user: { username: string; password: string }) => {
    const response = await fetch('http://localhost:8080/api/v1/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()
    return data
  }
)

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
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
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.usersData
        console.log(state.users)
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token, userData } = action.payload
        state.isLoggedIn = true
        state.isLoading = false
        state.loggedInUser = userData
        state.loggedInUserName = userData.username
        if (state.loggedInUserName === 'admin') {
          state.isAdmin = true
        } else {
          state.isAdmin = false
        }
      })
  }
})

export const authActions = { ...authSlice.actions, fetchUsers, signupThunk, loginThunk }
export default authSlice.reducer
