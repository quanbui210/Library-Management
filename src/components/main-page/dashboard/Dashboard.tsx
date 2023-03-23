import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import axios from 'axios'

import './Dasboard.scss'

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
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    books: {
      total: 0,
      returned: 0,
      notReturned: 0
    },
    authors: {
      total: 0
    },
    categories: {
      total: 0
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard.json')
        setDashboardData(response.data)
        console.log(dashboardData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  console.log(dashboardData)
  return (
    <div className="dasboard-container">
      <Link to="..">
        <KeyboardReturnIcon className="return-icon" />
      </Link>
      <Typography variant="h4" component="h1" mb={4}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card one">
            <CardContent>
              <Typography gutterBottom>Total Books</Typography>
              <Typography variant="h5" component="h2">
                {dashboardData && dashboardData.books ? dashboardData.books.total : 'No Data'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card two">
            <CardContent>
              <Typography gutterBottom>Total Authors</Typography>
              <Typography variant="h5" component="h2">
                {dashboardData.authors ? dashboardData.authors.total : 'No Data'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card three">
            <CardContent>
              <Typography gutterBottom>Returned</Typography>
              <Typography variant="h5" component="h2">
                {dashboardData.books ? dashboardData.books.returned : 'No Data'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card four">
            <CardContent>
              <Typography gutterBottom>Not Returned</Typography>
              <Typography variant="h5" component="h2">
                {dashboardData.books ? dashboardData.books.notReturned : 'No Data'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card five">
            <CardContent>
              <Typography gutterBottom>Categories</Typography>
              <Typography variant="h5" component="h2">
                {dashboardData.categories ? dashboardData.categories.total : 'No Data'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
