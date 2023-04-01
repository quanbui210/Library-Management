import Form from 'react-bootstrap/Form'
import './LoginForm.scss'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/authentication/authSlice'
import { AppDispatch, RootState } from '../../store/store'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'

const LoginForm = () => {
  const [enteredUserName, setEnteredUserName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

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
  const loginGoogle = () => {
    login()
  }

  return (
    <>
      <Form className="form" onSubmit={submitHandler} autoComplete="off">
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
          <button type="submit">Login</button>
          <button type="button" onClick={loginGoogle}>
            Sign in with Google <i className="devicon-google-plain"></i>
          </button>
        </Form.Group>
        {/* <div className="instruction">
          <p>Login: Username: &#39;admin&#39; (+features) or &#39;user&#39;. Pw: password</p>
          <p>
            Admin can modify data, while user can borrow, return, and add book to favourite list
          </p>
          <p>Make sure to try both! *Login as user with Google</p>
        </div> */}
      </Form>
    </>
  )
}

export default LoginForm
// 🚀
