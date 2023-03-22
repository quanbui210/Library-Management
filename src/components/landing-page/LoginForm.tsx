import Form from 'react-bootstrap/Form'
import './LoginForm.scss'

import { Dispatch } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../store/authentication/authSlice'
import { RootState } from '../../store/store'

const LoginForm = () => {
  const [enteredUserName, setEnteredUserName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authActions.fetchUser())
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home/admin')
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
        <h5>Login</h5>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Enter username"
            value={enteredUserName}
            onChange={userNameHandler}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Password</Form.Label>
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
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm
