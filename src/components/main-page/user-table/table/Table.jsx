/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import DataTableForm from '../form/DataTableForm'
import './Table.scss'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullName', headerName: 'FullName', width: 370 },
  { field: 'username', headerName: 'Username', width: 170 },
  { field: 'role', headerName: 'Role', width: 170 },
  {
    field: 'booksBorrowed',
    headerName: 'Borrowed',
    width: 160
  },
  {
    field: 'booksReturned',
    headerName: 'Returned',
    width: 160
  }
]

export default function DataTable() {
  const users =
    useSelector((state) => (Array.isArray(state.auth.users) ? state.auth.users : [])) || []
  const showTable = useSelector((state) => state.toggle.show)
  console.log(showTable)

  const tableRow = []

  users.forEach((user) => {
    return tableRow.push(user)
  })

  return (
    <>
      {showTable && <DataTableForm />}
      <div style={{ height: 420 }} className="tabel">
        <DataGrid
          rows={tableRow}
          columns={columns}
          pageSize={6}
          className="data-table"
          // checkboxSelection
          style={{ backgroundColor: '#ccc' }}
        />
      </div>
    </>
  )
}
