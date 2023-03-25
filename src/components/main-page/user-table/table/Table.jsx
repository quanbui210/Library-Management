/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from 'react-redux'
import AddUserForm from '../form/AddUserForm'
import { authActions } from '../../../../store/authentication/authSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './Table.scss'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullName', headerName: 'FullName', width: 370 },
  { field: 'username', headerName: 'Username', width: 270 },
  { field: 'role', headerName: 'Role', width: 170 },
  {
    field: 'booksBorrowed',
    headerName: 'Borrowed',
    width: 180
  },

  {
    field: 'delete',
    headerName: '',
    sortable: false,
    width: 100,
    renderCell: (params) => <DeleteButton userId={params.row.id} />
  }
]

function DeleteButton({ userId }) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?')
    if (confirmed) {
      dispatch(authActions.deleteUser({ id: userId }))
    }
  }

  return <DeleteForeverIcon onClick={handleDelete}>Delete</DeleteForeverIcon>
}

export default function DataTable() {
  const users =
    useSelector((state) => (Array.isArray(state.auth.users) ? state.auth.users : [])) || []
  const showTable = useSelector((state) => state.toggle.show)
  const isAdmin = useSelector((state) => state.auth.isAdmin)
  console.log(showTable)

  const tableRow = []

  users.forEach((user) => {
    return tableRow.push(user)
  })

  return (
    <>
      {showTable && isAdmin && <AddUserForm />}
      <div className="table">
        <DataGrid
          rows={tableRow}
          columns={columns}
          pageSize={8}
          className="data-table"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[4, 6, 10]}
          autoHeight
          disableRowSelectionOnClick
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
    </>
  )
}
