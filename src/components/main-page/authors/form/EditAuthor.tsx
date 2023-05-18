/* eslint-disable react/no-unescaped-entities */
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../../../store/store'
import GoBackBtn from '../../../btn/GoBackBtn'
import { authorsActions } from '../../../../store/authors/authorsSlice'
import './EditAuthor.scss'

export default function EditAuthor() {
  const { authorId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)
  const author = authors.find((a) => a.id === authorId)
  const nameInputRef = useRef<HTMLTextAreaElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const editedAuthor = {
      name: nameInputRef.current?.value ?? '',
      description: descInputRef.current?.value ?? ''
    }
    await dispatch(
      authorsActions.editAuthorThunk({
        authorId: authorId ?? '',
        author: editedAuthor
      })
    )
    await dispatch(authorsActions.fetchAuthorsThunk())
    navigate('/home/authors')
  }

  return (
    <div className="authors-form-container">
      <GoBackBtn />
      <h2>{author && author.name}</h2>
      <p>{author?.description}</p>
      <img src={author?.image} alt="" />
      <Form className="authors-action-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control ref={nameInputRef} as="textarea" placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control ref={descInputRef} as="textarea" placeholder="Enter description" />
        </Form.Group>
        <Form.Group>
          <Button className="add-form-btn" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
