/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

import Layout from './components/layout/MainLayout'
import LandingPage from './components/landing-page/LandingPage'
import MainPage from './components/main-page/MainPage'

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
