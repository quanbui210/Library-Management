import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryData } from '../../types'

export interface CategoryState {
  items: CategoryData[]
  isLoading: boolean
}

const initialState: CategoryState = {
  items: [],
  isLoading: false
}

const fetchCategoriesThunk = createAsyncThunk('categories/fetch', async () => {
  const response = await fetch(`https://library-backend-tije.onrender.com/api/v1/categories`)
  const categoriesData = await response.json()
  return {
    categoriesData
  }
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      return {
        isLoading: false,
        items: action.payload.categoriesData
      }
    })
    builder.addCase(fetchCategoriesThunk.rejected, (state) => {
      return {
        ...state,
        isLoading: false
      }
    })
  }
})

export const categoryActions = { ...categorySlice.actions, fetchCategoriesThunk }
export default categorySlice.reducer
