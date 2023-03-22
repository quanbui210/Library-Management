import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { authActions } from '../../store/authentication/authSlice'
import { useEffect } from 'react'

import './Navigation.scss'

const Navigation = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(isLoggedIn)

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return (
    <header className="main-header">
      <Link to="/">
        <img alt="" src={logo}></img>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
