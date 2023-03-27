import logo from '../../assets/logoo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { authActions } from '../../store/authentication/authSlice'
import { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person'

import './Navigation.scss'

const Navigation = () => {
  const { isLoggedIn, isAdmin, loggedInUserName, googleUser } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(googleUser)
  const handleLogout = () => {
    dispatch(authActions.logout())
  }
  const handleGoogleLogout = () => {
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
            (googleUser !== null ? (
              <li>
                <PersonIcon className="person-icon" />
                {googleUser && googleUser.name} (Admin)
              </li>
            ) : (
              <li>
                <PersonIcon className="person-icon" />
                {isAdmin ? `${loggedInUserName} (Admin)` : `${loggedInUserName} (User)`}
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
