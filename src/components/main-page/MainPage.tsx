import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import PageCard from './card/PageCard'
import bookImg from '../../assets/books.png'
import usersImg from '../../assets/users.svg'
import dashboardImg from '../../assets/dasboard.jpeg'
import authorImg from '../../assets/authors.png'
import categoriesImg from '../../assets/categories.png'
import favImg from '../../assets/fav.svg'

import { borrowActions } from '../../store/borrow/borrowSlice'

import './MainPage.scss'

export default function MainPage() {
  const { isAdmin, loggedInUserName, googleUser, isLoading } = useSelector(
    (state: RootState) => state.auth
  )

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
  const toCheckouts = () => {
    navigate('/home/checkouts')
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="main-page">
      {loggedInUserName || googleUser !== undefined ? (
        <h2>Welcome to E-Library </h2>
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="card-container">
        {isAdmin ? (
          <PageCard
            title="Dasboard"
            imageURL={dashboardImg}
            description="View DashBoard"
            onClick={toDasboard}
            index="first"
          />
        ) : (
          <PageCard
            title="Checkout List"
            imageURL={dashboardImg}
            description="Checkout"
            onClick={toCheckouts}
            index="first"
          />
        )}

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
        {!isAdmin ? (
          <PageCard
            title="Favourite Books"
            imageURL={favImg}
            description="View Favourite Books"
            onClick={toFavourite}
            index="six"
          />
        ) : (
          <PageCard
            title="Checkout List"
            imageURL={dashboardImg}
            description="Checkout"
            onClick={toCheckouts}
            index="first"
          />
        )}
      </div>
    </div>
  )
}
