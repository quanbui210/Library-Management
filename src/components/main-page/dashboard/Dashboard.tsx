import { Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import GoBackBtn from '../../btn/GoBackBtn'
import './Dasboard.scss'
import { RootState } from '../../../store/store'
import Categories from '../categories/Categories'

type Books = {
  total: number
  returned: number
  notReturned: number
}

type Authors = {
  total: number
}

type Categories = {
  total: number
}

type DashboardData = {
  books: Books
  authors: Authors
  categories: Categories
}

export default function Dashboard() {
  const books = useSelector((state: RootState) => state.book.items)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const users = useSelector((state: RootState) => state.auth.users)

  const dashboardData = books && authors

  return (
    <div className="dasboard-container">
      <GoBackBtn />
      <Typography variant="h4" component="h1" mb={4}>
        Dashboard
      </Typography>
      {dashboardData ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f8bbd0' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Total Books
                </Typography>
                <Typography variant="h5" component="h2">
                  {books.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#c5cae9' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Total Authors
                </Typography>
                <Typography variant="h5" component="h2">
                  {authors.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Users
                </Typography>
                <Typography variant="h5" component="h2">
                  12
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Returned
                </Typography>
                <Typography variant="h5" component="h2">
                  30
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffcc80' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Not Returned
                </Typography>
                <Typography variant="h5" component="h2">
                  20
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#b2dfdb' }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Categories
                </Typography>
                <Typography variant="h5" component="h2">
                  {categories.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress /> // Display a loading spinner while fetching data
      )}
    </div>
  )
}
