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
  fullName: string
  id: number
  username: string
  password: string
  role: 'user' | 'admin'
  booksBorrowed: number | undefined
}

export type Author = {
  id: string
  name?: string | undefined
  description: string
}

export interface Book {
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
}

interface AuthorBook {
  isbn: number
  title: string
}

export interface AuthorData {
  description: ReactNode
  name: string
  books: AuthorBook[]
  image: string
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
  invalid: boolean
  error: boolean
  users: User[]
  enteredUsername: string
  enteredPassword: string
  isAdmin: boolean | null | undefined
  addUserError: boolean | null
  loggedInUserName: string
  googleUser: GoogleUser | undefined
  profile: any | null
}

export interface CategoryData {
  id: any
  name: string
  books: Book[]
}
