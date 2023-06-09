import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PersonIcon from '@mui/icons-material/Person'

import { RootState } from '../../store/store'
import { authActions } from '../../store/authentication/authSlice'
import logo from '../../assets/logoo.jpeg'

import './Navigation.scss'

const Navigation = () => {
  const { isLoggedIn, isAdmin, loggedInUserName, googleUser, loggedInUser } = useSelector(
    (state: RootState) => state.auth
  )
  console.log(loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
          {isLoggedIn &&
            (googleUser !== undefined ? (
              <li>
                <PersonIcon className="person-icon" />
                {loggedInUser.username}
              </li>
            ) : (
              <li>
                <PersonIcon className="person-icon" />
                {isAdmin ? `${loggedInUser.username} (admin)` : `${loggedInUser.username} (user)`}
              </li>
            ))}
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
{
  /* <li>
<button onClick={handleLogout}>Log Out</button>
</li> */
}

export default Navigation

// {isLoggedIn && googleUser !== null ? (
//   <li>
//     <PersonIcon className="person-icon" />
//     {googleUser && googleUser.name}
//   </li>
// ) : (
//   <li>
//     <PersonIcon className="person-icon" />
//     {isAdmin ? `${loggedInUserName} (Admin)` : `${loggedInUserName} (User)`}
//   </li>
// )}
