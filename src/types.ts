import { Dispatch, Key, ReactNode, SetStateAction } from 'react'

export interface GoogleUser {
  name?: string
  accessToken?: string
  expiresIn?: number
  idToken?: string
  scope?: string
  tokenType?: string
  id?: number
  username?: string
  password?: string
  role?: 'user'
  booksBorrowed?: number | undefined
}

export interface User {
  fullName?: string
  id?: number
  username?: string
  password?: string
  role?: 'user' | 'admin'
  booksBorrowed?: number | undefined
}

type Author = {
  name?: string | undefined
}

export interface Book {
  publisher: string
  category: string
  ISBN: string
  title: string
  authors?: Author[]
  status: string
  borrowedId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  isFav: boolean
  description: string
}

interface AuthorBook {
  ISBN: string
  title: string
}

export interface AuthorData {
  name: string
  books: AuthorBook[]
  dateOfBirth: string
  shortSummary: string
  image: string
  id: number
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
  googleUser: GoogleUser | null
  profile: any | null
}
