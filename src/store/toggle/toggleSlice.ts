import { createSlice } from '@reduxjs/toolkit'

export interface ToggleState {
  show: boolean
  showSnackBar: boolean
}

const initialState = {
  show: false,
  showSnackBar: false
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
    }
  }
})

export const toggleActions = toggleSlice.actions
export default toggleSlice.reducer
