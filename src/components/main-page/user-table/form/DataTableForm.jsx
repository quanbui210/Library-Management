/* eslint-disable react/no-unescaped-entities */
import Form from 'react-bootstrap/Form'
import { Button } from '@mui/material'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../../store/authentication/authSlice'
import { toggleActions } from '../../../../store/toggle/toggleSlice'

import './DataTable.scss'
export default function DataTableForm() {
  const dispatch = useDispatch()
  const fullNameRef = useRef('')
  const passwordRef = useRef('')
  const userNameRef = useRef('')
  const idRef = useRef('')
  const roleRef = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const fullName = fullNameRef.current.value
    const username = userNameRef.current.value
    const password = passwordRef.current.value
    const userId = idRef.current.value
    const role = roleRef.current.value

    dispatch(
      authActions.addUsers({
        id: userId,
        fullName,
        username,
        password,
        role
      })
    )
    fullNameRef.current.value = ''
    userNameRef.current.value = ''
    passwordRef.current.value = ''
    idRef.current.value = ''
    roleRef.current.value = ''
  }

  return (
    <>
      <div className="add-form-container">
        <Form onSubmit={handleSubmit} className="add-user-form">
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Username: </Form.Label>
            <Form.Control ref={userNameRef} className="form-control" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Full Name: </Form.Label>
            <Form.Control
              ref={fullNameRef}
              className="form-control"
              type="text"
              placeholder="Enter full name"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">User's Id: </Form.Label>
            <Form.Control
              ref={idRef}
              className="form-control"
              type="number"
              placeholder="Enter UserId"
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">User Role: </Form.Label>
            <Form.Select ref={roleRef} className="form-control">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Password: </Form.Label>
            <Form.Control
              ref={passwordRef}
              className="form-control"
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group className="form-group-btn">
            <Button className="add-form-btn" type="submit">
              Add User
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}
