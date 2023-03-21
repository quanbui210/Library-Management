export interface User {
  name: string
  username: string
  password: string
  role: 'user' | 'admin'
}
