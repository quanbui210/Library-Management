import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

import PageCard from './card/PageCard'
import bookImg from '../../assets/books.png'
import usersImg from '../../assets/users.svg'
import dashboardImg from '../../assets/dasboard.jpeg'

import './MainPage.scss'

export default function MainPage() {
  const { isAdmin } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const toDasboard = () => {
    navigate('/home/dashboard')
  }
  const toBooks = () => {
    navigate('/home/books')
  }
  const toUsersList = () => {
    navigate('/home/users')
  }
  return (
    <div className="main-page">
      <h2>
        {isAdmin
          ? 'Welcom to E-Library (Admin)'
          : 'Welcome to E-Library, Explore and Borrow thousands of books'}
      </h2>
      <div className="card-container">
        <PageCard
          title="Dasboard"
          imageURL={dashboardImg}
          description="View DashBoard"
          onClick={toDasboard}
          index="first"
        />
        <PageCard
          title="Books"
          imageURL={bookImg}
          description="Explore List of Books"
          onClick={toBooks}
          index="second"
        />
        <PageCard
          title="Users"
          imageURL={usersImg}
          description="Manage List of Users"
          onClick={toUsersList}
          index="third"
        />
        <PageCard
          title="Users"
          imageURL={usersImg}
          description="Manage List of Users"
          onClick={toUsersList}
          index="third"
        />
        <PageCard
          title="Books"
          imageURL={bookImg}
          description="Explore List of Books"
          onClick={toBooks}
          index="second"
        />
        <PageCard
          title="Dasboard"
          imageURL={dashboardImg}
          description="View DashBoard"
          onClick={toDasboard}
          index="first"
        />
      </div>
    </div>
  )
}
