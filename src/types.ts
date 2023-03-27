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

type Author = {
  name: string
}

export interface Book {
  publisher: ReactNode
  category: string
  ISBN: string
  title: string
  authors: Author[]
  status: string
  borrowedId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  isFav: boolean
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
}

export type SearchProps = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}
