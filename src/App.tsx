/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/main-layout'
import LandingPage from './components/landing-page/landing-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><LandingPage/></Layout>
  },
  {
    path: '/home/admin',
    element: <Layout><h1>Logged in as ADMIN</h1></Layout>
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
