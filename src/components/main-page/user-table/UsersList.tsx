import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import DataTable from './table/Table'
import { toggleActions } from '../../../store/toggle/toggleSlice'
import GoBackBtn from '../../btn/GoBackBtn'
import { RootState } from '../../../store/store'

import './UsersList.scss'

export default function UsersList() {
  const { isAdmin } = useSelector((state: RootState) => state.auth)
  const show = useSelector((state: RootState) => state.toggle.show)
  console.log(show)
  const dispatch = useDispatch()

  const showAddUserForm = () => {
    if (!show) {
      dispatch(toggleActions.showForm())
    } else {
      dispatch(toggleActions.hideForm())
    }
  }
  return (
    <div className="table">
      <GoBackBtn />
      <h1>List of All Users</h1>
      {isAdmin && (
        <Button className="show-form-btn" onClick={showAddUserForm}>
          {show ? 'Close' : 'Add new User'}
        </Button>
      )}
      <DataTable />
    </div>
  )
}
