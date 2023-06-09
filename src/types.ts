import { Dispatch, Key, ReactNode, SetStateAction } from 'react'

export interface GoogleUser {
  name: string
  accessToken: string
  expiresIn: number
  idToken: string
  scope: string
  tokenType: string
  id: number
  username: string
  password: string
  role: 'user'
  booksBorrowed: number | undefined
}

export interface User {
  role: ReactNode
  id: number
  username: string
  password: string
  checkoutList?: []
}

export type Author = {
  id: string
  name?: string | undefined
  description: string
}

export interface Book {
  id: string
  publishers: string
  categoryName: string
  isbn: number
  title: string
  authorName: string
  status: string
  borrowedId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  isFav: boolean
  description: string
  imageUrl: string
}

interface AuthorBook {
  isbn: number
  title: string
}

export interface AuthorData {
  description: ReactNode
  name: string
  books: AuthorBook[]
  imageUrl: string
  id: string
}

export type SearchProps = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export interface AddUserPayload {
  id: number
  fullName: string
  email: string
  role: 'user' | 'admin'
  password: string
  username: string
  booksBorrowed: number | undefined
}

export interface AuthState {
  isLoggedIn: boolean | null
  isLoading: boolean
  invalid: boolean | null
  error: boolean
  users: User[]
  enteredUsername: string
  enteredPassword: string
  isAdmin: boolean | null | undefined
  addUserError: boolean | null
  loggedInUserName: string
  googleUser: GoogleUser | undefined
  profile: any | null
  loggedInUser: {
    id: string
    username: string
  }
  loginInvalid: boolean | null
}

export interface CategoryData {
  id: any
  name: string
  books: Book[]
}

export interface CheckoutData {
  id: string
  bookId: string
  userId: string
  bookName: string
  username: string
  borrowedDate: string
  returnedDate: string | null
  returned: boolean
}
