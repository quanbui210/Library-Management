import Form from 'react-bootstrap/Form'
import './LoginForm.scss'

import { Dispatch } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/authentication/authSlice'
import { RootState } from '../../store/store'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const LoginForm = () => {
  const [enteredUserName, setEnteredUserName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const googleUser = useSelector((state: RootState) => state.auth.googleUser)
  console.log(googleUser)
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error)
  })
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          const profile = res.data
          dispatch(authActions.setGoogleProfile({ profile: profile }))
          console.log(profile)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  // log out function to log the user out of google and set the profile array to null

  useEffect(() => {
    dispatch(authActions.fetchUser())
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredUserName(e.target.value)
  }
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(e.target.value)
  }

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(
      authActions.loginUser({ enteredUsername: enteredUserName, enteredPassword: enteredPassword })
    )
  }

  return (
    <>
      <Form className="form" onSubmit={submitHandler}>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Username: </Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Enter username"
            value={enteredUserName}
            onChange={userNameHandler}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Password: </Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={passwordHandler}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <button type="submit">Login</button>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </Form.Group>
        <div className="instruction">
          <p>Login: Username: 'admin'(+features) or 'user'. Pw: password</p>
          <p>With Google: Demo project, so all users login with google are admin</p>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
