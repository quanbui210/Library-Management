/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

import Layout from './components/layout/MainLayout'
import LoginPage from './components/login-page/LoginPage'
import Dashboard from './components/main-page/dashboard/Dashboard'
import MainPage from './components/main-page/MainPage'
import Books from './components/main-page/book-list/Books'
import UsersList from './components/main-page/user-table/UsersList'
import Authors from './components/main-page/authors/Authors'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><LoginPage/></Layout>
  },
  {
    path: '/home',
    element: <Layout><MainPage/></Layout>,
    // children: [
    //   {
    //     path: '/home/dashboard',
    //     element: <Layout><Dashboard/></Layout>
    //   }
    // ]
  },
  {
    path: '/home/dashboard',
    element: <Layout><Dashboard/></Layout>
  },
  {
    path: '/home/books',
    element: <Layout><Books/></Layout>
  },
  {
    path: '/home/users',
    element: <Layout><UsersList/></Layout>
  },
  {
    path: '/home/authors',
    element: <Layout><Authors/></Layout>
  },
  {
    path: '/home/categories',
    element: <Layout><h1>Categories</h1></Layout>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
