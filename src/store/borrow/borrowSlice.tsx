import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CheckoutData } from '../../types'
import { fabClasses } from '@mui/material'

export interface CheckoutState {
  items: CheckoutData[]
  isLoading: boolean
}

const initialState: CheckoutState = {
  items: [],
  isLoading: false
}

interface ReturnData {
  checkoutId: string
}

const getCheckoutsThunk = createAsyncThunk('checkouts/fetch', async () => {
  const response = await fetch('https://lib-backend-e0qi.onrender.com/api/v1/checkouts')
  const checkoutsData = await response.json()
  console.log(checkoutsData)
  return {
    checkoutsData
  }
})

const borrowBook = createAsyncThunk(
  'checkouts/borrow',
  async (checkoutRequest: { bookId: string; userId: string }) => {
    const response = await fetch('https://lib-backend-e0qi.onrender.com/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutRequest)
    })
    const newCheckout = await response.json()
    return {
      newCheckout
    }
  }
)
const returnBook = createAsyncThunk('checkouts/return', async (checkoutId: ReturnData) => {
  const response = await fetch('https://lib-backend-e0qi.onrender.com/api/v1/return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(checkoutId)
  })
  const returnedBook = await response.json()
  return {
    returnedBook
  }
})

const borrowSlice = createSlice({
  name: 'checkouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCheckoutsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload.checkoutsData
    })
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(returnBook.fulfilled, (state) => {
      state.isLoading = false
    })
  }
})

export const borrowActions = {
  ...borrowSlice.actions,
  getCheckoutsThunk,
  borrowBook,
  returnBook
}
export default borrowSlice.reducer
