export interface User {
  fullName: string
  id: number
  username: string
  password: string
  role: 'user' | 'admin'
  booksBorrowed: number
}

type Author = {
  name: string
}

export interface Book {
  ISBN: string
  title: string
  authors: Author[]
  status: string
  borrowedId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
}
