/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

import Layout from './components/layout/main-layout'
import LandingPage from './components/landing-page/landing-page'
import MainPage from './components/main-page/main-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><LandingPage/></Layout>
  },
  {
    path: '/home/admin',
    element: <Layout><MainPage/></Layout>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
