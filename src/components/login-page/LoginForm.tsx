import Form from 'react-bootstrap/Form'
import { AppDispatch, RootState } from '../../store/store'

import './LoginForm.scss'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/authentication/authSlice'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'

const LoginForm = () => {
  const [enteredUserName, setEnteredUserName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.auth)
  console.log(isAdmin)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [user, setUser] = useState<Omit<
    TokenResponse,
    'error' | 'error_description' | 'error_uri'
  > | null>(null)

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
        })
        .catch((err) => console.log('aaa'))
    }
  }, [user])

  // log out function to log the user out of google and set the profile array to null

  useEffect(() => {
    dispatch(authActions.fetchUsers())
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

  const signupHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const logginUser = {
      username: enteredUserName,
      password: enteredPassword
    }
    dispatch(authActions.signupThunk(logginUser))
  }

  const loginHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const logginUser = {
      user: {
        username: enteredUserName,
        password: enteredPassword
      }
    }
    dispatch(authActions.loginThunk(logginUser))
  }
  const loginGoogle = () => {
    login()
  }

  return (
    <>
      <Form className="form" autoComplete="off">
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Username: </Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-control"
            placeholder="Enter username"
            value={enteredUserName}
            onChange={userNameHandler}
            name="form-username"
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Password: </Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-control"
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={passwordHandler}
            name="form-password"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <button onClick={signupHandler} type="button">
            Sign Up
          </button>
          <button onClick={loginHandler} type="button">
            Login
          </button>
          <button type="button" onClick={loginGoogle}>
            Sign in with Google <i className="devicon-google-plain"></i>
          </button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm
// 🚀
