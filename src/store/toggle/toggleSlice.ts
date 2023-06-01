import { createSlice } from '@reduxjs/toolkit'

export interface ToggleState {
  show: boolean
  showSnackBar: boolean
  isSignup: boolean
}

const initialState: ToggleState = {
  show: false,
  showSnackBar: false,
  isSignup: false
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    showForm: (state) => {
      state.show = true
    },
    hideForm: (state) => {
      state.show = false
    },
    isSignupAction: (state) => {
      state.isSignup = true
    },
    exitSignup: (state) => {
      state.isSignup = false
    }
  }
})

export const toggleActions = toggleSlice.actions
export default toggleSlice.reducer
