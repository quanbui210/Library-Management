import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    show: (state) => {
      state.show = true
    },
    hide: (state) => {
      state.show = false
    }
  }
})

export const toggleActions = toggleSlice.actions
export default toggleSlice.reducer
