import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { Link } from 'react-router-dom'

export default function MainPage() {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <h1>{isAdmin ? 'Logged In as Admin' : 'Logged In as User'}</h1>
    </>
  )
}
