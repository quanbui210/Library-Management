import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export default function MainPage() {
  const { isAdmin } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <h1>{isAdmin ? 'Logged In as Admin' : 'Logged In as User'}</h1>
    </>
  )
}
