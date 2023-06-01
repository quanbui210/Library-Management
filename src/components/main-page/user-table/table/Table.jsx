/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography, Grid } from '@mui/material'
import AddUserForm from '../form/AddUserForm'
import { authActions } from '../../../../store/authentication/authSlice'

import './Table.scss'

function UserCard({ user }) {
  return (
    <Card className="user-card">
      <CardContent>
        <Typography variant="h6" component="div">
          {user.username}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          User ID: {user.id}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Checkouts: {user.checkoutList.length}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function UserTable() {
  const users = useSelector((state) => state.auth.users) || []
  return (
    <>
      <div className="complex-layout">
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}
