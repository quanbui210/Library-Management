import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

import PageCard from './card/PageCard'
import bookImg from '../../assets/books.png'
import usersImg from '../../assets/users.svg'
import dashboardImg from '../../assets/dasboard.jpeg'
import authorImg from '../../assets/authors.png'
import categoriesImg from '../../assets/categories.png'
import favImg from '../../assets/fav.jpeg'

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
  const toAuthorsList = () => {
    navigate('/home/authors')
  }
  const toCategories = () => {
    navigate('/home/categories')
  }
  const toFavourite = () => {
    navigate('/home/favourites')
  }
  return (
    <div className="main-page">
      <h2>{isAdmin ? 'Welcome to E-Library (Admin)' : 'Welcome to E-Library (User)'}</h2>
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
          title="Categories"
          imageURL={categoriesImg}
          description="Manage List of Users"
          onClick={toCategories}
          index="fourth"
        />
        <PageCard
          title="Authors"
          imageURL={authorImg}
          description="Explore List of Books"
          onClick={toAuthorsList}
          index="five"
        />
        <PageCard
          title="Favourite Books"
          imageURL={favImg}
          description="View Favourite Books"
          onClick={toFavourite}
          index="six"
        />
      </div>
    </div>
  )
}
